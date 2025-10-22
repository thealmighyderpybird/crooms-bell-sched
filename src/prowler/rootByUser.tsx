"use client";

import { type Dispatch, type SetStateAction, useEffect, useState, useCallback } from "react";
import CBSHServerURL from "~/lib/CBSHServerURL";
import styles from "./prowler.module.css";
import type Post from "~/types/ProwlerPost";
import useAlert from "~/AlertContext";
import type User from "~/types/user";
import ProwlerPost from "./post";

interface UserData {
    displayname: string,
    username: string,
    verified: boolean,
    id: string,
}

interface ProwlerRequestGET {
    status: "OK" | "FAILED",
    data: Post[],
}

interface ProwlerData {
    source: string,
    incrementor: number,
    posts: Post[],
}

const prowler: ProwlerData = {
    source: CBSHServerURL + "/feed/user/",
    incrementor: 50,
    posts: [],
};

export default function ProwlerRoot({ sid, uid, session, user }: { sid: string, uid: string, session: User, user: string }) {
    const [userData, setUserData]: [UserData, Dispatch<SetStateAction<UserData>>]  = useState({
        displayname: "",
        username: "",
        verified: false,
        id: "",
    } as UserData);

    useEffect(() => {
        async function doAction() {
            const r = await fetch(CBSHServerURL + "/users/" + user, {
                headers: {
                    "Authorization": JSON.stringify(sid)
                }
            });
            const res = await r.json() as { status: "OK" | "FAILED", data: UserData };
            setUserData(res.data);
        }
        void doAction();
    }, [user]);

    const { createAlertBalloon } = useAlert();
    // @ts-expect-error force type on react state
    const [posts, setPosts]: [Post[], Dispatch<SetStateAction<Post[]>>] = useState([]);
    const [isTriggered, setIsTriggered] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [startAt, setStartAt] = useState(0);

    const getPosts = useCallback(async () => {
        try {
            const r = await fetch(prowler.source + user, {
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

        setPosts((prev: Post[]) => [...prev, ...data]);
        setStartAt((prev) => prev + prowler.incrementor);
        setIsTriggered(false);
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

    return <div id="prowler" style={{ marginBlockStart: "0.5rem" }}>
        <div className={ styles.prowlerPostContainer }>
            { posts.map((post: Post) => <ProwlerPost post={post} key={post.id} sid={sid} uid={uid} session={session} />) }
        </div>
    </div>;
};