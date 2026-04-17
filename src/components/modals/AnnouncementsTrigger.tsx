"use client";

import type Announcement from "~/types/Announcement";
import ActionBadge from "~/components/ActionBadge";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Announcements from "./Announcements";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AnnouncementsTrigger() {
    const [viewedAnnouncements, setViewedAnnouncements] = useState<string[]>([]);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        void fetch(CBSHServerURL + "/announcements/website")
            .then(r => r.json() as Promise<{ status: "OK" | "FAILED", data: Announcement[] }>)
            .then(r => {
                if (r.status !== "OK") setError(true);
                setAnnouncements(r.data);
            }).catch(() => setError(true));
    }, []);

    const priorityAnnouncements = announcements.filter(a => a.priority);

    useEffect(() => {
        setViewedAnnouncements(JSON.parse(localStorage.getItem("viewed-announcements") ?? "[]"));
    }, []);

    const viewedPriorityAnnouncements = priorityAnnouncements.filter(a => viewedAnnouncements.includes(a.id));
    const priorityDiff = priorityAnnouncements.length - viewedPriorityAnnouncements.length;

    return <>
        <div className="p-3 flex flex-row flex-nowrap items-center hover:bg-(--sec) active:bg-(--tri) group relative"
             onClick={() => setIsActive(!isActive)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5rem" height="1.5rem"
                 style={{ cursor: "inherit", fill: "var(--main)" }}>
                <path d="M20.039 4.751a1 1 0 0 0 1.922.551l.827-2.884a1 1 0 1 0-1.922-.55zm8.668-1.458a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414l3-3a1 1 0 0 1 1.414 0M26 11.002a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2h-3a1 1 0 0 1-1-1M11.956 5.659a3 3 0 0 1 4.805-.78l10.36 10.36a3 3 0 0 1-.78 4.804l-4.749 2.375a5.5 5.5 0 0 1-9.813 4.906l-2.717 1.359A3 3 0 0 1 5.6 28.12L3.88 26.4a3 3 0 0 1-.562-3.463zm1.62 20.767a3.5 3.5 0 0 0 6.218-3.109zm1.77-20.133a1 1 0 0 0-1.6.26l-8.64 17.279a1 1 0 0 0 .187 1.154l1.72 1.72a1 1 0 0 0 1.155.188l17.279-8.64a1 1 0 0 0 .26-1.601" />
            </svg>
            { priorityDiff > 0 && <div className="absolute top-1 right-1">
                <ActionBadge color="accent-color" number={priorityDiff} /></div> }
            <div className="hidden group-hover:block absolute top-12.75 bg-(--pri) overflow-y-auto z-10 transform-[translateX(-.75rem)] p-2"
                 style={{ fontSize: "0.8rem", boxShadow: "black 0 10px 10px" }}>Announcements</div>
        </div>
        { isActive && createPortal(<Announcements setIsActiveAction={setIsActive} announcements={announcements} error={error}
                                                  viewed={viewedAnnouncements} setViewedAction={setViewedAnnouncements} />,
            document.getElementById("modal-portal")!) }
    </>;
}