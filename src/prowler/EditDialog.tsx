"use client";

import styles from "~/components/dialog/dialog.module.css";
import postStyles from "./postOverlay.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import LiveEdit from "~/components/LiveEdit";
import type Post from "~/types/ProwlerPost";
import useAlert from "~/AlertContext";
import { useState } from "react";

export default function EditDialog({ sid, post, setIsActive }: { sid: string, post: Post, setIsActive: (arg0: boolean) => void }) {
    const [newContent, setNewContent] = useState(post.data);
    const { createAlertBalloon } = useAlert();

    return <>
        <div className="modal" onClick={() => setIsActive(false)}></div>
        <div className={`${styles.dialog} ${styles.controlledWidth} ${styles.controlledHeight} ${styles.separatedContent}`}>
            <div className={postStyles.content}>
                <header><h2 style={{ marginBlockEnd: "0.5rem" }}>Edit Post</h2></header>
                <main className={postStyles.content}>
                    <LiveEdit value={newContent} mentionHelper onChange={(e) => setNewContent(e)}
                              style={{ height: "102px", resize: "none" }} />
                </main>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsActive(false)}>Cancel</button>
                <button onClick={() => editPost(sid, post, newContent, setIsActive, createAlertBalloon)}>Save</button>
            </div>
        </div>
    </>;
};

const editPost = async (sid: string, post: Post, content: string, setIsActive: (arg0: boolean) => void,
                          createAlertBalloon: (title: string, message: string, severity: -1|0|1|2) => void) => {
    const r = await fetch(CBSHServerURL + "/feed/" + post.id, {
        method: "PATCH",
        body: JSON.stringify({
            data: content,
        }),
        headers: {
            "Authorization": JSON.stringify(sid),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
    const res = await r.json() as { status: "OK" | "FAILED", data: { error: string, result: boolean } };

    if (res.status !== "OK") {
        createAlertBalloon("Failed to edit post", res.data.error, 2);
        return;
    }

    setIsActive(false);
};