"use client";

import PendingProwlerLockDialog from "./PendingProwlerLock";
import ProwlerLockDialog from "./ProwlerLock";
import { createPortal } from "react-dom";

export default function ClientProwlerLock({ allowed }: { allowed: boolean | "pending" }) {
    const setIsActive = (boolean: boolean) => boolean;

    return <>
        { allowed === false && createPortal(<ProwlerLockDialog setIsActiveAction={setIsActive} />,
            document.getElementById("modal-portal")!)}
        { allowed === "pending" && createPortal(<PendingProwlerLockDialog setIsActiveAction={setIsActive} />,
            document.getElementById("modal-portal")!)}
    </>
}