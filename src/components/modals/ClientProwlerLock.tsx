"use client";

import ProwlerLockDialog from "./ProwlerLock";
import {createPortal} from "react-dom";

export default function ClientProwlerLock({ allowed }: { allowed: boolean }) {
    return !allowed && createPortal(<ProwlerLockDialog />, document.getElementById("modal-portal")!)
}