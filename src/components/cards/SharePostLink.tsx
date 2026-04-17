"use client";

import NewPostDialog from "~/prowler/NewPostDialog";
import { useState, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { createPortal } from "react-dom";

export default function SharePostLink({ children, sid, canIPost }: { children: ReactNode, sid: string, canIPost: boolean | "pending" }) {
    const [enabled, setEnabled] = useState(false);
    return <>
        { canIPost === true && <a className="inline-block w-fit mb-4 select-none links" onClick={() => {
            if (sid === "" || sid === undefined || sid === null) redirect("/auth/login");
            else setEnabled(true);
        }}>{ children }</a> }
        { enabled && createPortal(<NewPostDialog sid={sid} setIsActive={setEnabled} />, document.getElementById("modal-portal")!) }
    </>;
};