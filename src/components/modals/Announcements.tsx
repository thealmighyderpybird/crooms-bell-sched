"use client";

import AnnouncementItem from "../announcement/Announcement";
import overlayStyles from "../dialog/dialog.module.css";
import type Announcement from "~/types/Announcement";
import CBSHServerURL from "~/lib/CBSHServerURL";
import { useState, useEffect } from "react";

export default function Announcements({ setIsActive }: { setIsActive: (arg0: boolean) => void }) {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        void fetch(CBSHServerURL + "/announcements/website")
            .then(r => r.json() as Promise<{ status: "OK" | "FAILED", data: Announcement }>)
            // @ts-expect-error type shii
            .then(r => setAnnouncements(r.data));
    }, []);

    return <>
        <div className={overlayStyles.modal} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth}`}>
            <header><h2 style={{ lineHeight: "1" }}>Announcements</h2></header>
            <main style={{ width: "100%" }}>{ announcements.map((announcement: Announcement) =>
                <AnnouncementItem announcement={announcement} key={announcement.id} />) }</main>
            <footer className={overlayStyles.actionButtons}>
                <button className={overlayStyles.button} onClick={() => setIsActive(false)}>Close</button>
            </footer>
        </div>
    </>;
}