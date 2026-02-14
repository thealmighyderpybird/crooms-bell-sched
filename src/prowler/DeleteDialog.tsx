"use client";

import styles from "~/components/dialog/dialog.module.css";
import postStyles from "./postOverlay.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import type Post from "~/types/ProwlerPost";
import sanitizeHtml from "sanitize-html";
import useAlert from "~/AlertContext";

export default function DeleteDialog({ sid, post, setIsActive }: { sid: string, post: Post, setIsActive: (arg0: boolean) => void }) {
    const { createAlertBalloon } = useAlert();

    return <>
        <div className="modal" onClick={() => setIsActive(false)}></div>
        <div className={`${styles.dialog} ${styles.controlledWidth} ${styles.controlledHeight} ${styles.separatedContent}`}>
            <div className={postStyles.content}>
                <header><h2>Delete Message</h2></header>
                <main className={postStyles.content}>
                    <p>Are you sure you want to delete this message?</p>
                    <div className={postStyles.post}>
                        { sanitizeHtml(post.data) }
                    </div>
                </main>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsActive(false)}>No</button>
                <button onClick={() => deletePost(sid, post.id, setIsActive, createAlertBalloon)}>Yes</button>
            </div>
        </div>
    </>
};

const deletePost = async (sid: string, postId: string, setIsActive: (arg0: boolean) => void,
                          createAlertBalloon: (title: string, message: string, severity: -1|0|1|2) => void) => {
    const r = await fetch(CBSHServerURL + "/feed/" + postId, {
        method: "DELETE",
        headers: {
            "Authorization": JSON.stringify(sid),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if (r.status === 204) {
        setIsActive(false);
        return;
    }

    const res = await r.json() as { data: { error: string } };
    createAlertBalloon("Failed to delete", res.data.error, 2);
};