"use client";

import ProwlerLockDialog from "~/components/modals/ProwlerLock";
import indexStyles from "../../app/index.module.css";
import NewPostDialog from "~/prowler/NewPostDialog";
import { useState, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { createPortal } from "react-dom";

export default function SharePostLink({ children, sid, canIPost }: { children: ReactNode, sid: string, canIPost: boolean }) {
    const [prowlerLockEnabled, setProwlerLockEnabled] = useState(false);
    const [enabled, setEnabled] = useState(false);
    return <>
        <a className={indexStyles.sharePostLink + " links"} onClick={() => {
            if (sid === "" || sid === undefined || sid === null) redirect("/auth/login");
            else if (!canIPost) setProwlerLockEnabled(true);
            else setEnabled(true);
        }}>{ children }</a>
        { enabled && createPortal(<NewPostDialog sid={sid} setIsActive={setEnabled} />, document.getElementById("modal-portal")!) }
        { prowlerLockEnabled && createPortal(<ProwlerLockDialog setIsActive={setProwlerLockEnabled} />, document.getElementById("modal-portal")!) }
    </>;
};