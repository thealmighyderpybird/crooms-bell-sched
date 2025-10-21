"use client";

import styles from "~/components/dialog/dialog.module.css";
import postStyles from "./postOverlay.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import type Post from "~/types/ProwlerPost";
import useAlert from "~/AlertContext";
import { useState } from "react";

export default function ReportDialog({ sid, post, setIsActive }: { sid: string, post: Post, setIsActive: (arg0: boolean) => void }) {
    const [reason, setReason] = useState("");
    const { createAlertBalloon } = useAlert();

    return <>
        <div className="modal" onClick={() => setIsActive(false)}></div>
        <div className={`${styles.dialog} ${styles.controlledWidth} ${styles.controlledHeight} ${styles.separatedContent}`}>
            <div className={postStyles.content}>
                <header><h2 style={{ marginBlockEnd: "0.5rem" }}>Report Post</h2></header>
                <main className={postStyles.content}>
                    <p style={{ marginBlockEnd: "0.25rem" }}>Please enter a reason why this post should be reviewed:</p>
                    <label htmlFor="reportReason" className="hidden">Reason</label>
                    <input value={reason} onChange={(e) => setReason(e.currentTarget.value)}
                           className={ styles.input } id="reportReason" name="reportReason" enterKeyHint="done" />
                </main>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsActive(false)}>Cancel</button>
                <button onClick={() => reportPost(sid, post, reason, setIsActive, createAlertBalloon)}>Report</button>
            </div>
        </div>
    </>;
};

const reportPost = async (sid: string, post: Post, reason: string, setIsActive: (arg0: boolean) => void,
                          createAlertBalloon: (title: string, message: string, severity: -1|0|1|2) => void) => {
    const r = await fetch(CBSHServerURL + "/feed/report/" + post.id + "/" + reason, {
        method: "POST",
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