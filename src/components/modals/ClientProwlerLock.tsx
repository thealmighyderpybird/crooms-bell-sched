"use client";

import ProwlerLockDialog from "./ProwlerLock";
import { createPortal } from "react-dom";

export default function ClientProwlerLock({ allowed }: { allowed: boolean }) {
    const setIsActive = (boolean: boolean) => boolean;

    return !allowed && createPortal(<ProwlerLockDialog setIsActiveAction={setIsActive} />, document.getElementById("modal-portal")!)
}