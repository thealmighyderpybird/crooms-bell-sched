"use client";

import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import styles from "./prowlerPost.module.css";
import { useRouter } from "next/navigation";
import useAlert from "~/AlertContext";
import { useState } from "react";
import LiveEdit from "~/components/LiveEdit";

export default function PostPage({ session }: { session: { uid: string, sid: string } }) {
    const [onPostErrorContent, setOnPostErrorContent] = useState("");
    const [postContent, setPostContent] = useState("");
    const { createAlertBalloon } = useAlert();
    const router = useRouter();

    return <>
        <div className={styles.prowlerForm}>
            <LiveEdit value={postContent} onChange={(e) => setPostContent(e)} />
        </div>
        { onPostErrorContent !== "" ? <p className={ styles.error }>{ onPostErrorContent }</p> : null }
        <div className={ styles.actionBar }>
            <button onClick={(e) => {
                e.currentTarget.innerHTML = "Please wait...";
                setOnPostErrorContent("");
                e.currentTarget.disabled = true;

                try { void sharePost(postContent, session.sid, setOnPostErrorContent, router) }
                catch (error) {
                    e.currentTarget.disabled = false;
                    e.currentTarget.innerHTML = "Share Post";
                    // @ts-expect-error message may not exist
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    createAlertBalloon("Something went wrong", error?.message, 2);
                }
            }} className={ styles.button } disabled={ postContent === "" }>Share Post</button>
        </div>
    </>;
};

const regex = /^https:?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i;

const sharePost = async (content: string, sid: string, setError: (error: string) => void, router: AppRouterInstance) => {
    if (content.includes("<script") || content.includes("<iframe") || content.includes("<object") || content.includes("<embed") || content.includes("<template") || content.includes("<link")) {
        setError("Scripts, embedded webpages, and embedded objects are not allowed.");
        return;
    }
    if (content.includes("<audio") || content.includes("<video")) {
        setError("Please add a link to your multimedia content.");
        return;
    }

    const request = new Request("https://api.croomssched.tech/feed", {
        method: "POST",
        body: JSON.stringify({ "data": content }),
        headers: {
            "Authorization": JSON.stringify(sid),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    const response = await fetch(request);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const status = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    if (status.data.error) setError(status.data.error);
    else router.push("/");
};