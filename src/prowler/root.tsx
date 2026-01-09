"use client";

import { useEffect, useState, useCallback } from "react";
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

export default function ProwlerRoot({ sid, uid, session, deviceType }: { sid: string, uid: string, session: User, deviceType: string }) {
    const { createAlertBalloon } = useAlert();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isTriggered, setIsTriggered] = useState(false);
    const [startAt, setStartAt] = useState(0);
    let ws: WebSocket;
    let reconnectTimer: NodeJS.Timeout = undefined!;
    let shownDisconnected = false;
    let loading = false;
    let [loadingText, setLoadingText] = useState("Connecting to Crooms Bell Schedule Services");

    const createWebsocket = () => {
        ws = new WebSocket(CBSHServerURL.replace("http://", "ws://").replace("https://", "ws://"));
        ws.addEventListener('open', () => {
            console.log('[Prowler] Connected!');
            setLoadingText("Connected");
            shownDisconnected = false;

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
                if (!shownDisconnected) {
                    createAlertBalloon("Prowler", `Disconnected from server`, 1);
                    shownDisconnected = true;
                }
                setLoadingText("Disconnected from server, reconnecting...");

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
                for (let index = 0; index < prowler.posts.length; index++) {
                    if (prowler.posts[index]?.id == delPost.ID) {
                        prowler.posts = prowler.posts.splice(index, 1);
                        setPosts(prowler.posts);
                        console.log("deleted post " + index);
                        break;
                    }
                }
            }
            else if (data.Message === "UpdatePost") {
                const updatePost = data as UpdatePostWebsocketMessage;
                for (let index = 0; index < prowler.posts.length; index++) {
                    let post = prowler.posts[index];
                    if (post === undefined) return;
                    if (post.id == updatePost.ID) {
                        post.data = updatePost.NewContent;
                        prowler.posts[index] = post;
                        break;
                    }
                }
                setPosts(prowler.posts);
            }
            else if (data.Message === "NewPost") {
                const newPost = data as NewPostWebsocketMessage;
                setPosts((prev: Post[]) => uniquePosts([newPost.Data, ...prev]));
            }
        });
    };

    const loadPostsBefore = useCallback(async (beforeId: string) => {
        try {
            setLoadingText("Loading data");
            console.log("fetch before " + beforeId + ", 50 items");
            const r = await fetch(CBSHServerURL + "/feed/before/" + beforeId + "?limit=50", {
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

            prowler.posts = [...prowler.posts, ...res.data];

        } catch (e) {
            createAlertBalloon("Something went wrong", // @ts-expect-error it's unknown but known
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
        }
        setLoadingText("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getPosts = useCallback(async () => {
        try {
            setLoadingText("Loading data...");
            const r = await fetch(CBSHServerURL + "/feed?limit=50", {
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
            await loadPosts();

            createWebsocket();

        } catch (e) {
            createAlertBalloon("Something went wrong", // @ts-expect-error it's unknown but known
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
        }
        setLoadingText("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPosts = async () => {
        console.log("[Prowler] loading old posts, current len: " + prowler.posts.length);
        const lastItem = prowler.posts[prowler.posts.length - 1];
        if (!lastItem) return;
        await loadPostsBefore(lastItem.id);

        setPosts(() => prowler.posts);
        setStartAt(prev => prev + prowler.incrementor);
        setIsTriggered(false);

        console.log("[Prowler] done, result len: " + prowler.posts.length);
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
        const onScroll = async () => {
            if (loading) return;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const scrollTop = document.documentElement.scrollTop;

            const scrollPercent = (scrollTop + clientHeight) / scrollHeight * 100;

            if (!isTriggered && scrollPercent >= 95 && scrollPercent < 100) {
                loading = true;
                console.log("scroll triggered");
                setIsTriggered(true);
                await loadPosts();
                loading = false;
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startAt]);

    return <div id="prowler">
        <div className={styles.prowlerPostContainer}>
            { (loadingText !== "" && loadingText !== "Connected") && <p>{loadingText}</p> }
            {posts.map((post: Post) => <ProwlerPost post={post} sid={sid} uid={uid} session={session}
                deviceType={deviceType} key={post.id} />)}
        </div>
    </div>;
};