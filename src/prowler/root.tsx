"use client";

import { type Dispatch, type SetStateAction, useEffect, useState, useCallback } from "react";
import CBSHServerURL from "~/lib/CBSHServerURL";
import type Post from "~/types/ProwlerPost";
import styles from "./prowler.module.css";
import useAlert from "~/AlertContext";
import type User from "~/types/user";
import ProwlerPost from "./post";

interface ProwlerRequestGET {
    status: "OK" | "FAILED",
    code: string
    data: Post[],
}

interface ProwlerData {
    source: string,
    incrementor: number,
    posts: Post[],
}

const prowler: ProwlerData = {
    source: CBSHServerURL + "/feed",
    incrementor: 50,
    posts: [],
};

interface WebsocketMessage {
    Message: string
}
interface DeletePostWebsocketMessage {
    Message: string,
    ID: string
}
interface UpdatePostWebsocketMessage {
    Message: string,
    ID: string,
    NewContent: string
}
interface NewPostWebsocketMessage {
    Message: string,
    Data: Post
}

export default function ProwlerRoot({ sid, uid, session }: { sid: string, uid: string, session: User }) {
    const { createAlertBalloon } = useAlert();
    // @ts-expect-error force type on react state
    const [posts, setPosts]: [Post[], Dispatch<SetStateAction<Post[]>>] = useState([]);
    const [isTriggered, setIsTriggered] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [startAt, setStartAt] = useState(0);
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout = undefined!;

    const createWebsocket = () => {
        ws = new WebSocket(CBSHServerURL.replace("http://", "ws://"));
        ws.addEventListener('open', event => {
            console.log('Connected to Prowler');

            if (reconnectTimer) {
                clearInterval(reconnectTimer);
                reconnectTimer = undefined!;

                createAlertBalloon("Prowler", "Reconnected to server", 0);
            }
        });

        ws.addEventListener('close', event => {
            // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
            // 1001: going away
            console.log("disconnected with code " + event.code)
            if (event.code !== 1001) {
                createAlertBalloon("Prowler", `Disconnected from server`, 1);

                if (!reconnectTimer) {
                    console.log("create reconnect timer");
                    reconnectTimer = setInterval(() => {
                        console.log("attempting to reconnect");
                        createWebsocket();
                    }, 5000);
                }
            }
        });

        ws.addEventListener('message', event => {
            const data: WebsocketMessage = JSON.parse(event.data as string) as WebsocketMessage;

            if (data.Message === "DeletePost") {
                const delPost = data as DeletePostWebsocketMessage;
                /*for (let index = 0; index < prowler.posts.length; index++) {
                    if (prowler.posts[index]?.id == delPost.ID) {
                        //prowler.posts.splice(index, 1);
                        //setPosts(prowler.posts);
                        //console.log("deleted post " + index);
                        //prowler.posts.slice(index);
                        break;

                        // TODO: this doesnt work
                    }
                }*/
            }
            else if (data.Message === "UpdatePost") {
                // TODO
                // schema, ID NewContent
            }
            else if (data.Message === "NewPost") {
                const newPost = data as NewPostWebsocketMessage;
                setPosts((prev: Post[]) => uniquePosts([newPost.Data, ...prev]));
            }
        });
    };

    const getPosts = useCallback(async () => {
        try {
            const r = await fetch(prowler.source, {
                headers: {
                    "Authorization": JSON.stringify(sid),
                    "Content-Type": "application/json",
                }
            });
            const res = await r.json() as ProwlerRequestGET;

            if (res.status !== "OK") {
                createAlertBalloon("Something went wrong", // @ts-expect-error error is not explicitly defined
                    `Failed to fetch the latest from Prowler. Error details: ${res.data.error}`, 1);
                return;
            }
            prowler.posts = res.data;
            loadPosts();

            createWebsocket();

        } catch (e) {
            createAlertBalloon("Something went wrong", // @ts-expect-error it's unknown but known
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPosts = () => {
        const data: Post[] = [];

        for (let i = startAt; i < startAt + prowler.incrementor - 1; i++) {
            if (prowler.posts[i]) data.push(prowler.posts[i]!)
        }

        setPosts((prev: Post[]) => uniquePosts([...prev, ...data]));
        setStartAt((prev) => prev + prowler.incrementor);
        setIsTriggered(false);
    }

    function uniquePosts(posts: Post[]) {
        const seen = new Set<string>();
        return posts.filter(post => {
            if (seen.has(post.id)) return false;
            seen.add(post.id);
            return true;
        });
    }

    useEffect(() => {
        void getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!hasMore) return;

        const onScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;

            const scrollPercent = (scrollTop + clientHeight) / scrollHeight * 100;

            if (!isTriggered && scrollPercent >= 95 && scrollPercent < 100) {
                console.log("scroll triggered");
                setIsTriggered(true);
                loadPosts();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startAt]);

    return <div id="prowler">
        <div className={styles.prowlerPostContainer}>
            {posts.map((post: Post) => <ProwlerPost post={post} sid={sid} uid={uid} session={session} key={post.id} />)}
        </div>
    </div>;
};