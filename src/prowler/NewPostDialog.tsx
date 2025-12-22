"use client";

import styles from "~/components/dialog/dialog.module.css";
import postStyles from "./postOverlay.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import LiveEdit from "~/components/LiveEdit";
import useAlert from "~/AlertContext";
import { useState } from "react";
import Link from "next/link";

export default function NewPostDialog({ sid, setIsActive }: { sid: string, setIsActive: (arg0: boolean) => void }) {
    const [isCloseFriends, setIsCloseFriends] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [content, setContent] = useState("");
    const { createAlertBalloon } = useAlert();

    return <>
        <div className="modal" onClick={() => setIsActive(false)}></div>
        <div className={`${styles.dialog} ${styles.controlledWidth} ${styles.separatedContent}`}>
            <div className={postStyles.content}>
                <header><h2 style={{ marginBlockEnd: "0.5rem" }}>Create Post</h2></header>
                <main className={postStyles.content}>
                    <LiveEdit value={content} mentionHelper onChange={(e) => setContent(e)} />
                </main>
            </div>
            <div className={postStyles.closeFriends}>
                <input type="checkbox" id="close-friends-toggle" name="close-friends-toggle" checked={isCloseFriends}
                       onChange={e => setIsCloseFriends(e.currentTarget.checked)} />
                <label htmlFor="close-friends-toggle">
                    <strong>Make this a Close Friends post</strong>
                    Close Friends posts can only be seen by those you choose.
                    You can manage this in <Link href="https://account.croomssched.tech/account-center/close-friends"
                        target="CBSH_AccountCenter">Account Center</Link>.
                </label>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsActive(false)}>Cancel</button>
                <button onClick={() => createPost(sid, content, isCloseFriends, setIsActive, setDisabled,
                                                                 createAlertBalloon)}
                        disabled={disabled}>Post</button>
            </div>
        </div>
    </>
};

const createPost = async (sid: string, content: string, closeFriends: boolean,
                          setIsActive: (arg0: boolean) => void, setIsDisabled: (arg0: boolean) => void,
                          createAlertBalloon: (title: string, message: string, severity: -1|0|1|2) => void) => {
    setIsDisabled(true);
    const r = await fetch(CBSHServerURL + "/feed", {
        method: "POST",
        body: JSON.stringify({
            store: closeFriends ? "closeFriends" : "public",
            data: content,
        }),
        headers: {
            "Authorization": JSON.stringify(sid),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });

    if (r.status === 429) {
        createAlertBalloon("Give us a second", "Our server is currently busy, " +
            "please wait 15 seconds before trying again.", 0);
        setIsDisabled(false);
        return;
    }

    const res = await r.json() as { status: "OK" | "FAILED", data: { error: string } };

    if (res.status !== "OK") {
        createAlertBalloon("Failed to post", res.data.error, 2);
        setIsDisabled(false);
        return;
    }

    setIsActive(false);
};