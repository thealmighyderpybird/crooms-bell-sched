"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
    const [loadingText, setLoadingText] = useState("Connecting to Crooms Bell Schedule Services");

    // FIX: All mutable persistent values moved to refs so they survive re-renders
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const shownDisconnectedRef = useRef(false);
    const loadingRef = useRef(false);
    // FIX: Ref always holds the latest createWebsocket so setInterval never captures a stale closure
    const createWebsocketRef = useRef<(() => void) | null>(null);

    const createWebsocket = useCallback(() => {
        // Close any existing socket cleanly before opening a new one
        if (wsRef.current) {
            wsRef.current.onclose = null; // prevent triggering reconnect logic on intentional close
            wsRef.current.close();
        }

        // FIX: Handle both http→ws and https→wss
        const wsUrl = CBSHServerURL
            .replace("https://", "wss://")
            .replace("http://", "ws://");

        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.addEventListener('open', () => {
            console.log('[Prowler] Connected!');
            setLoadingText("Connected");
            shownDisconnectedRef.current = false;

            if (reconnectTimerRef.current) {
                clearInterval(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
                createAlertBalloon("Prowler", "Reconnected to server", 0);
            }
        });

        ws.addEventListener('close', event => {
            // https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent/code
            // 1000: normal closure, 1001: going away — don't reconnect for either
            console.log("disconnected with code " + event.code);
            if (event.code !== 1000 && event.code !== 1001) {
                if (!shownDisconnectedRef.current) {
                    createAlertBalloon("Prowler", `Disconnected from server`, 1);
                    shownDisconnectedRef.current = true;
                }
                setLoadingText("Disconnected from server, reconnecting...");

                if (!reconnectTimerRef.current) {
                    console.log("create reconnect timer");
                    reconnectTimerRef.current = setInterval(() => {
                        console.log("attempting to reconnect");
                        // FIX: Call via ref so interval always invokes the latest function
                        createWebsocketRef.current?.();
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
                        prowler.posts.splice(index, 1);
                        // FIX: Spread to a new array so React detects the change and re-renders
                        setPosts([...prowler.posts]);
                        console.log("deleted post " + index);
                        break;
                    }
                }
            }

            else if (data.Message === "UpdatePost") {
                const updatePost = data as UpdatePostWebsocketMessage;
                const postIndex = prowler.posts.findIndex(post => post.id === updatePost.ID);
                if (postIndex <= -1) return;

                prowler.posts[postIndex]!.data = updatePost.NewContent;
                // FIX: Spread to a new array so React detects the change and re-renders
                setPosts([...prowler.posts]);
            }
            else if (data.Message === "NewPost") {
                const newPost = data as NewPostWebsocketMessage;
                setPosts((prev: Post[]) => uniquePosts([newPost.Data, ...prev]));
            }
        });
    }, [createAlertBalloon]);

    // Keep the ref in sync with the latest createWebsocket function
    useEffect(() => {
        createWebsocketRef.current = createWebsocket;
    }, [createWebsocket]);

    // FIX: Clean up WebSocket and reconnect timer on unmount
    useEffect(() => {
        return () => {
            if (reconnectTimerRef.current) {
                clearInterval(reconnectTimerRef.current);
                reconnectTimerRef.current = null;
            }
            if (wsRef.current) {
                wsRef.current.onclose = null;
                wsRef.current.close(1000);
                wsRef.current = null;
            }
        };
    }, []);

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
                "Failed to fetch the latest from Prowler. Error details: " + (e as Error).message, 2);
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
                "Failed to fetch the latest from Prowler. Error details: " + (e as Error).message, 2);
        }
        setLoadingText("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadPosts = async () => {
        console.log("[Prowler] loading old posts, current len: " + prowler.posts.length);
        const lastItem = prowler.posts[prowler.posts.length - 1];
        if (!lastItem) return;
        await loadPostsBefore(lastItem.id);

        // FIX: Spread to new array so React re-renders
        setPosts(() => [...prowler.posts]);
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
        const container = document.getElementById("prowler-container")!;

        const onScroll = async () => {
            // FIX: Use ref for loading flag so it persists across renders
            if (loadingRef.current) return;
            const checkingElement = deviceType === "mobile" ? document.documentElement : container;

            const scrollHeight = checkingElement.scrollHeight;
            const clientHeight = checkingElement.clientHeight;
            const scrollTop = checkingElement.scrollTop;

            const scrollPercent = (scrollTop + clientHeight) / scrollHeight * 100;

            if (!isTriggered && scrollPercent >= 90 && scrollPercent < 100) {
                loadingRef.current = true;
                setIsTriggered(true);
                await loadPosts();
                loadingRef.current = false;
            }
        };

        container.addEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll);
        // FIX: Remove BOTH listeners on cleanup, not just window's
        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('scroll', onScroll);
        };
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
