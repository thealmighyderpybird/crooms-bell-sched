"use client";

import type {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import styles from "./prowlerPost.module.css";
import { useRouter } from "next/navigation";
import useAlert from "~/AlertContext";
import { useState } from "react";

export default function PostPage({ session }: { session: { uid: string, sid: string } }) {
    const [onPostErrorContent, setOnPostErrorContent] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postLink, setPostLink] = useState("");
    const { createAlertBalloon } = useAlert();
    const router = useRouter();

    return <>
        <div className={styles.prowlerForm}>
            <input id="post-content" name="post-content" placeholder="Post" autoCapitalize="off"
                   value={postContent} onChange={e => setPostContent(e.target.value)}
                   onKeyDown={() => setOnPostErrorContent("")} />
            <input id="post-link" name="post-link" placeholder="Link (optional)" autoCapitalize="off" spellCheck={false}
                   value={postLink} onChange={e => setPostLink(e.target.value)}
                   onKeyDown={() => setOnPostErrorContent("")} />
        </div>
        { onPostErrorContent !== "" ? <p className={ styles.error }>{ onPostErrorContent }</p> : null }
        <div className={ styles.actionBar }>
            <button onClick={(e) => {
                e.target.innerHTML = "Please wait...";
                setOnPostErrorContent("");
                e.target.disabled = true;

                try { void sharePost(postContent, postLink, session.sid, setOnPostErrorContent, router) }
                catch (error) {
                    e.target.disabled = false;
                    e.target.innerHTML = "Share Post";
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    createAlertBalloon("Something went wrong", error.message, 2);
                }
            }} className={ styles.button } disabled={ postContent === "" }>Share Post</button>
        </div>
    </>;
};

const regex = /^https:?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i;

const sharePost = async (content: string, link: string, sid: string, setError: (error: string) => void, router: AppRouterInstance) => {
    if (link && !regex.test(link)) {
        setError("The link entered is not valid. Please enter a valid link starting with \"https://\".");
        return;
    }
    let data = convertHTML(content);
    if (data.includes("<script") || data.includes("<iframe") || data.includes("<object") || data.includes("<embed") || data.includes("<template") || data.includes("<link")) {
        setError("Scripts, embedded webpages, and embedded objects are not allowed.");
        return;
    }
    if (data.includes("<img") || data.includes("<picture") || data.includes("<audio") || data.includes("<video") || data.includes("<source")) {
        setError("Please add a link to your multimedia content.");
        return;
    }
    if (data.includes("<a")) {
        setError("Please use the link section to add a link.");
        return;
    }
    if (link) data = "<a target=CBSHfeed href="+ link +">" + data + "</a>";

    const request = new Request("https://api.croomssched.tech/feed", {
        method: "POST",
        body: JSON.stringify({ "data": data }),
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

const convertHTML = (str: string): string => {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
        "[": "<",
        "]": ">"
    };
    return str
        .split("")
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        .map(entity => htmlEntities[entity] ?? entity)
        .join("");
};