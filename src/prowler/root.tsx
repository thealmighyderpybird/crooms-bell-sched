"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import CBSHServerURL from "~/lib/CBSHServerURL";
import type Post from "~/types/ProwlerPost";
import styles from "./prowler.module.css";
import useAlert from "~/AlertContext";
import type User from "~/types/user";
import ProwlerPost from "./post";
import Link from "next/link";

type ProwlerRequestGET = {
    status: "OK" | "FAILED",
    code: string
    data: Post[],
}

type ProwlerData = {
    incrementor: number,
    source: string,
}

const prowler: ProwlerData = {
    source: CBSHServerURL + "/prowler",
    incrementor: 50,
};

type WebsocketMessage = {
    Message: string
}
type DeletePostWebsocketMessage = {
    Message: string,
    ID: string
}
type UpdatePostWebsocketMessage = {
    NewContent: Partial<Post>,
    Message: string,
    ID: string,
}
type NewPostWebsocketMessage = {
    Message: string,
    Data: Post
}

export default function ProwlerRoot({ sid, uid, session, deviceType, canIPost }: { sid: string, uid: string, session: User, deviceType: string, canIPost: boolean | "pending" }) {
    const [loadingText, setLoadingText] = useState("Connecting to Crooms Bell Schedule Services");
    const reconnectTimer = useRef<NodeJS.Timeout>(undefined!);
    const [shownDisconnected, setShownDisconnected] = useState(false);
    const [isTriggered, setIsTriggered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [startAt, setStartAt] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);
    const { createAlertBalloon } = useAlert();
    let ws: WebSocket;

    const createWebsocket = () => {
        ws = new WebSocket(CBSHServerURL.replace("http://", "ws://"));
        ws.addEventListener('open', () => {
            console.log('[Prowler] Connected!');
            setLoadingText("Connected");
            setShownDisconnected(false);

            if (reconnectTimer.current) {
                clearInterval(reconnectTimer.current);
                reconnectTimer.current = undefined!;

                createAlertBalloon("Prowler", "You're reconnected to our servers!", 0);
            }
        });

        ws.addEventListener('close', event => {
            // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
            // 1001: going away
            console.log("disconnected with code " + event.code)
            if (event.code !== 1001) {
                if (!shownDisconnected) {
                    setShownDisconnected(true);
                }
                setLoadingText("Disconnected from server, reconnecting...");

                if (!reconnectTimer.current) {
                    console.log("create reconnect timer");
                    reconnectTimer.current = setInterval(() => {
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

                setPosts(prev => {
                    const postList = [...prev];
                    const postIndex = postList.findIndex(p => p.id === delPost.ID);
                    if (postIndex < 0) return prev;

                    postList.splice(postIndex, 1);
                    return postList;
                })
            } else if (data.Message === "UpdatePost") {
                const updatePost = data as UpdatePostWebsocketMessage;

                setPosts(prev => {
                    const postList = [...prev];
                    const postIndex = postList.findIndex(p => p.id === updatePost.ID);
                    if (postIndex < 0) return prev;

                    const post = postList[postIndex]!;
                    Object.assign(post, updatePost.NewContent);
                    postList[postIndex] = post;
                    return postList;
                });
            } else if (data.Message === "NewPost") {
                const { Data } = data as NewPostWebsocketMessage;
                setPosts(prev => uniquePosts([Data, ...prev]));
            }
        });
    };

    const loadPostsBefore = useCallback(async (beforeId: string) => {
        try {
            setLoadingText("Loading data");
            console.log("fetch before " + beforeId + ", 50 items");
            const r = await fetch(prowler.source + "/before/" + beforeId + "?limit=50", {
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

            setPosts(prev => uniquePosts([...prev, ...res.data]));
        } catch (e) {
            createAlertBalloon("Something went wrong", // @ts-expect-error it's unknown but known
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
        }
        setLoadingText("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPosts = async () => {
        try {
            const r = await fetch(prowler.source + "?limit=50", {
                headers: {
                    "Authorization": JSON.stringify(sid),
                    "Content-Type": "application/json",
                }
            });

            const res = await r.json() as ProwlerRequestGET;
            if (res.status !== "OK") {
                createAlertBalloon("Something went wrong", // @ts-expect-error error is not explicitly defined
                    `Failed to fetch the latest from Prowler. Error details: ${res.data.error}`, 1);
                return [];
            }

            return res.data;
        } catch (e: any) {
            createAlertBalloon("Something went wrong",
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
            return [];
        } finally {
            setLoadingText("");
        }
    }

    const getPosts = useCallback(async () => {
        const newPosts = await fetchPosts();
        setPosts(prev => uniquePosts([...prev, ...newPosts]));
        await loadPosts();
        createWebsocket();
    }, []);

    const loadPosts = async () => {
        let postList = posts;

        console.log("[Prowler] loading old posts, current len: " + postList.length);
        const lastItem = postList[postList.length - 1];
        if (!lastItem) return;
        await loadPostsBefore(lastItem.id);

        setStartAt(prev => prev + prowler.incrementor);
        setIsTriggered(false);

        console.log("[Prowler] done, result len: " + posts.length);
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
        setLoadingText("Loading data...");
        void getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const onScroll = async () => {
            if (loading) return;
            const checkingElement = deviceType === "mobile" ? document.documentElement : document.getElementById("prowler-container")!;

            const scrollHeight = checkingElement.scrollHeight;
            const clientHeight = checkingElement.clientHeight;
            const scrollTop = checkingElement.scrollTop;

            const scrollPercent = (scrollTop + clientHeight) / scrollHeight * 100;

            if (!isTriggered && scrollPercent >= 90 && scrollPercent < 100) {
                setLoading(true);
                setIsTriggered(true);
                await loadPosts();
                setLoading(false);
            }
        };

        document.getElementById("prowler-container")!.addEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startAt]);

    return <div id="prowler">
        <div className={styles.prowlerPostContainer}>
            <pre className="wrap-anywhere text-wrap whitespace-normal max-h-36 overflow-y-auto">{ JSON.stringify(posts) }</pre>
            {/* Signed Out Banner */}
            { (sid === "") && <div className="bg-(--sec) mb-2.5 p-3 rounded-2xl flex gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"
                     className="shrink-0">
                    <path d="M15.493 3.507a1.65 1.65 0 0 0-1.5 1.643V10a.75.75 0 0 1-.75.75c-1.443 0-2.457.588-3.206 1.488c-.773.928-1.276 2.206-1.591 3.557c-.313 1.343-.427 2.696-.461 3.722a22 22 0 0 0-.012.983h7.02v-.75a2.25 2.25 0 0 0-2.249-2.25h-1.25a.75.75 0 0 1 0-1.5h1.25a3.75 3.75 0 0 1 3.748 3.75v.75h.75a.75.75 0 0 0 .75-.75v-10A.75.75 0 0 1 18.74 9h.506a1.25 1.25 0 0 0 1.062-1.909l-.62-1a1.25 1.25 0 0 0-1.061-.591h-2.386a.75.75 0 0 1-.75-.75zM6.473 20.5c-.002-.284 0-.634.013-1.033c.036-1.083.157-2.542.5-4.012c.34-1.462.915-2.996 1.899-4.177c.872-1.047 2.055-1.801 3.61-1.985V5.15A3.15 3.15 0 0 1 15.641 2c.746 0 1.35.604 1.35 1.35V4h1.636c.95 0 1.834.492 2.335 1.3l.62 1c1.092 1.763-.084 4.02-2.093 4.19v9.26A2.25 2.25 0 0 1 17.242 22H5.795a3.797 3.797 0 0 1-2.775-6.39l1.135-1.217a3.06 3.06 0 0 0-.073-4.248L2.969 9.03a.75.75 0 0 1 1.06-1.06l1.114 1.114a4.56 4.56 0 0 1 .11 6.333l-1.136 1.216a2.3 2.3 0 0 0 1.68 3.867z"
                          fill="currentColor" />
                </svg>
                <div className="select-none">
                    <h3 className="leading-none text-inherit!">Sign In to share on Prowler</h3>
                    <p className="leading-none">Join Prowler on Crooms Bell Schedule today
                        and connect with students all across campus in real-time.</p>
                    <p className="leading-none mb-0">
                        <Link href="/auth/login" className="text-inherit!">Sign In</Link>
                    </p>
                </div>
            </div> }
            {/* ProwlerLock Banner */}
            { (canIPost === false && sid !== "") && <div className="bg-(--sec) p-3 rounded-2xl flex gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"
                     className="shrink-0">
                    <path d="M9.28 8.22a.75.75 0 0 0-1.06 1.06L10.94 12l-2.72 2.72a.75.75 0 1 0 1.06 1.06L12 13.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L13.06 12l2.72-2.72a.75.75 0 0 0-1.06-1.06L12 10.94zM22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 1.115 4.592l-1.068 3.823a1.25 1.25 0 0 0 1.54 1.54l3.826-1.067A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10M3.5 12a8.5 8.5 0 1 1 4.367 7.43l-.27-.15l-3.986 1.111l1.113-3.984l-.151-.27A8.46 8.46 0 0 1 3.5 12"
                          fill="currentColor" />
                </svg>
                <div className="select-none">
                    <h3 className="leading-none text-inherit!">You currently can't post on Prowler</h3>
                    <p className="leading-none">If you want to begin posting on Prowler, please access your ProwlerLock
                        info and start Basic Verification.</p>
                    <p className="leading-none mb-0">
                        <Link href="/prowlerlock" className="text-inherit!">View ProwlerLock Info</Link>
                    </p>
                </div>
            </div> }
            {/* Pending Banner */}
            { (canIPost === "pending" && sid !== "") && <div className="bg-(--info) text-white p-3 rounded-2xl flex gap-2.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"
                     className="shrink-0">
                    <path d="M3.5 12a8.5 8.5 0 1 1 17 0a8.5 8.5 0 0 1-17 0M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m-.007 4.648a.75.75 0 0 0-1.493.102v6l.007.102a.75.75 0 0 0 .743.648h4l.102-.007A.75.75 0 0 0 15.25 12H12V6.75z"
                          fill="currentColor" />
                </svg>
                <div className="select-none">
                    <h3 className="leading-none text-inherit!">You'll be allowed to use Prowler soon!</h3>
                    <p className="leading-none">It may take up to 5 days for an admin to review your information,
                        however it usually takes less time.</p>
                    <p className="leading-none mb-0">
                        <Link href="/prowlerlock" className="text-inherit!">View ProwlerLock Info</Link>
                    </p>
                </div>
            </div> }
            {/* Disconnected Banner */}
            { shownDisconnected && <div className="bg-(--warn) text-black p-3 rounded-2xl flex gap-2.5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24"
                     className="shrink-0">
                    <path d="M12 6.5a.75.75 0 0 1 .75.75v6.25a.75.75 0 0 1-1.5 0V7.25A.75.75 0 0 1 12 6.5m0 10.998a1 1 0 1 0 0-2a1 1 0 0 0 0 2M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.96 9.96 0 0 1-4.587-1.112l-3.826 1.067a1.25 1.25 0 0 1-1.54-1.54l1.068-3.823A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2m0 1.5A8.5 8.5 0 0 0 3.5 12c0 1.47.373 2.883 1.073 4.137l.15.27l-1.112 3.984l3.987-1.112l.27.15A8.5 8.5 0 1 0 12 3.5"
                          fill="currentColor" />
                </svg>
                <div className="select-none">
                    <h3 className="leading-none text-black!">You're disconnected from Prowler!</h3>
                    <p className="leading-none mb-0">New posts and edits will not show until you reconnect back with our servers.</p>
                </div>
            </div> }
            { (loadingText !== "" && loadingText !== "Connected" && !shownDisconnected) && <p>{loadingText}</p> }
            {posts.map(post => <ProwlerPost post={post} sid={sid} uid={uid} session={session}
                                            deviceType={deviceType} key={post.id} />)}
        </div>
    </div>;
};