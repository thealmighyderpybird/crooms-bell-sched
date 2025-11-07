"use client";

import AnnouncementItem from "../announcement/Announcement";
import overlayStyles from "../dialog/dialog.module.css";
import type Announcement from "~/types/Announcement";
import CBSHServerURL from "~/lib/CBSHServerURL";
import { useState, useEffect } from "react";

export default function Announcements({ setIsActive }: { setIsActive: (arg0: boolean) => void }) {
    const [announcements, setAnnouncements] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        void fetch(CBSHServerURL + "/announcements/website")
            .then(r => r.json() as Promise<{ status: "OK" | "FAILED", data: Announcement }>)
            .then(r => {
                if (r.status !== "OK") setError(true); // @ts-expect-error type shii
                setAnnouncements(r.data);
            }).catch(() => setError(true));
    }, []);

    return <>
        <div className={overlayStyles.modal} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth}`}>
            <header><h2 style={{ lineHeight: "1" }}>Announcements</h2></header>
            <main style={{ width: "100%" }}>{ !error ? announcements.map((announcement: Announcement) =>
                <AnnouncementItem announcement={announcement} key={announcement.id} />) :
                <div style={{ marginBlockStart: "0.5rem", userSelect: "none" }}>
                    <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="6rem" height="6rem">
                            <path d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
                                  fill="url(#fluentColorDismissCircle480)" />
                            <path d="m17.782 16.025l.102.091L24 22.233l6.116-6.117a1.25 1.25 0 0 1 1.666-.091l.102.091a1.25 1.25 0 0 1 .091 1.666l-.091.102L25.767 24l6.117 6.116a1.25 1.25 0 0 1 .091 1.666l-.091.102a1.25 1.25 0 0 1-1.666.091l-.102-.091L24 25.767l-6.116 6.117a1.25 1.25 0 0 1-1.666.091l-.102-.091a1.25 1.25 0 0 1-.091-1.666l.091-.102L22.233 24l-6.117-6.116a1.25 1.25 0 0 1-.091-1.666l.091-.102a1.25 1.25 0 0 1 1.666-.091"
                                  fill="url(#fluentColorDismissCircle481)" />
                            <defs>
                                <linearGradient x1="10.25" x2="36.5" y1="6.5" y2="45.25" gradientUnits="userSpaceOnUse"
                                                id="fluentColorDismissCircle480">
                                    <stop stopColor="#F83F54"></stop>
                                    <stop offset="1" stopColor="#CA2134"></stop>
                                </linearGradient>
                                <linearGradient x1="16.708" x2="25.3" y1="24.729" y2="33.663" gradientUnits="userSpaceOnUse"
                                                id="fluentColorDismissCircle481">
                                    <stop stopColor="#FDFDFD"></stop>
                                    <stop offset="1" stopColor="#FECBE6"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                        <h3>Failed to load Announcements</h3>
                        <p style={{ textAlign: "center", marginBlockEnd: "0", lineHeight: "1" }}>
                            We couldn&apos;t connect to the server to retrieve the Announcements.
                            Please try again later.
                        </p>
                    </div>
                </div> }
            </main>
            <footer className={overlayStyles.actionButtons}>
                <button className={overlayStyles.button} onClick={() => setIsActive(false)}>Close</button>
            </footer>
        </div>
    </>;
}