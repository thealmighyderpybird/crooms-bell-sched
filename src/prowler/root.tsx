"use client";

import { type Dispatch, type SetStateAction, useEffect, useState, useCallback } from "react";
import CBSHServerURL from "~/lib/CBSHServerURL";
import styles from "./prowler.module.css";
import type Post from "~/types/ProwlerPost";
import useAlert from "~/AlertContext";
import ProwlerPost from "./post";

interface ProwlerRequestGET {
    status: "OK" | "FAILED",
    data: Post[],
}

const prowler = {
    source: CBSHServerURL + "/feed",
    incrementor: 25,
};

export default function ProwlerRoot() {
    const { createAlertBalloon } = useAlert();
    // @ts-expect-error force type on react state
    const [posts, setPosts]: [Post[], Dispatch<SetStateAction<Post[]>>] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [startAt, setStartAt] = useState(0);

    
    const getPosts = useCallback(async () => {
        try {
            const r = await fetch(prowler.source + `/part/${startAt}/${startAt + prowler.incrementor - 1}`);
            const res = await r.json() as ProwlerRequestGET;

            if (res.status !== "OK") {
                createAlertBalloon("Something went wrong", // @ts-expect-error error is not explicitly defined
                    `Failed to fetch the latest from Prowler. Error details: ${res.data.error}`, 1);
                return;
            }

            const data = res.data;
            if (data.length === 0) {
                setHasMore(false);
                return;
            }
            
            setPosts((prev) => [...prev, ...data]);
            setStartAt((prev) => prev + prowler.incrementor);
        } catch (e) {
            createAlertBalloon("Something went wrong", // @ts-expect-error it's unknown but known
                "Failed to fetch the latest from Prowler. Error details: " + e.message, 2);
        }
    }, [createAlertBalloon, startAt]);

    const getNewPosts = async () => {
        const r = await fetch(prowler.source + `/after/${posts[0]?.id ?? ''}`);
        const res = await r.json() as ProwlerRequestGET;

        if (res.status !== "OK") {
            createAlertBalloon("Something went wrong", // @ts-expect-error error is not explicitly defined
                `Failed to fetch the latest from Prowler. Error details: ${res.data.error}`, 1);
            return;
        }

        const data = res.data;
        if (data.length > 0) {
            setPosts((prev) => [...data, ...prev]);
        }
    };

    useEffect(() => {
        void getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!hasMore) return;

        const onScroll = () => {
            if (
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight * 0.9
            ) {
                void getPosts();
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [startAt, hasMore, getPosts]);

    useEffect(() => {
        const interval = setInterval(() => {
            void getNewPosts();
        }, 30000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);

    return <div id="prowler">
        <div className={ styles.prowlerPostContainer }>
            { posts.map((post: Post, index) => <ProwlerPost post={post} key={index} />) }
        </div>
    </div>;
};