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

export default function ProwlerRoot({ sid, uid, session }: { sid: string, uid: string, session: User }) {
    const { createAlertBalloon } = useAlert();
    // @ts-expect-error force type on react state
    const [posts, setPosts]: [Post[], Dispatch<SetStateAction<Post[]>>] = useState([]);
    const [isTriggered, setIsTriggered] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [startAt, setStartAt] = useState(0);

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

    const getNewPosts = async () => {
        const r = await fetch(prowler.source + `/after/${posts[0]?.id ?? ''}`);
        const res = await r.json() as ProwlerRequestGET;

        if (res.code == "ERR_NO_SUCH_ID")
        {
            // Prowler is out of sync, do a full refresh
            console.log("prowler is out of sync, do full refresh");
            prowler.posts = [];
            loadPosts();
            return;
        }

        if (res.status !== "OK") {
            createAlertBalloon("Something went wrong", // @ts-expect-error error is not explicitly defined
                `Failed to fetch the latest from Prowler. Error details: ${res.data.error}`, 1);
            return;
        }

        const data = res.data;
        if (data.length > 0) {
            setPosts((prev: Post[]) => uniquePosts([...data, ...prev]));
        }
    };

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

    useEffect(() => {
        const interval = setInterval(() => {
            void getNewPosts();
        }, 30000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);

    return <div id="prowler">
        <div className={ styles.prowlerPostContainer }>
            { posts.map((post: Post) => <ProwlerPost post={post} sid={sid} uid={uid} session={session} key={post.id} />) }
        </div>
    </div>;
};