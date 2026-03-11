"use client";

import PendingProwlerLock from "~/components/modals/PendingProwlerLock";
import ProwlerLockDialog from "~/components/modals/ProwlerLock";
import indexStyles from "../../app/index.module.css";
import NewPostDialog from "~/prowler/NewPostDialog";
import { useState, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { createPortal } from "react-dom";

export default function SharePostLink({ children, sid, canIPost }: { children: ReactNode, sid: string, canIPost: boolean | "pending" }) {
    const [prowlerLockEnabled, setProwlerLockEnabled] = useState(false);
    const [pending, setPending] = useState(false);
    const [enabled, setEnabled] = useState(false);
    return <>
        <a className={indexStyles.sharePostLink + " links"} onClick={() => {
            if (sid === "" || sid === undefined || sid === null) redirect("/auth/login");
            else if (!canIPost) setProwlerLockEnabled(true);
            else if (canIPost === "pending") setPending(true);
            else setEnabled(true);
        }}>{ children }</a>
        { enabled && createPortal(<NewPostDialog sid={sid} setIsActive={setEnabled} />, document.getElementById("modal-portal")!) }
        { pending && createPortal(<PendingProwlerLock setIsActiveAction={setProwlerLockEnabled} />, document.getElementById("modal-portal")!) }
        { prowlerLockEnabled && createPortal(<ProwlerLockDialog setIsActiveAction={setProwlerLockEnabled} />, document.getElementById("modal-portal")!) }
    </>;
};