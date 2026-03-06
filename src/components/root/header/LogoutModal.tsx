"use client";

import overlayStyles from "~/components/dialog/dialog.module.css";
import { eventSignOut } from "~/lib/ssrSession";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function SignOutModal({ setIsActiveAction }: { setIsActiveAction: (active: boolean) => void }) {
    const [globalSignOut, setGlobalSignOut] = useState(false)

    return <>
        <div className={ overlayStyles.modal } onClick={(e) => {e.stopPropagation();
            setIsActiveAction(false);}}></div>
        <div className={`${overlayStyles.dialog} ${overlayStyles.separatedContent}`}>
            <div>
                <h2>Sign out</h2>
                <p>Are you sure you want to sign out of the Crooms Bell Schedule?</p>
                <div className="flex gap-2 items-start" title="Enable this if you plan on using another account.">
                    <input type="checkbox" id="browser-signout" className="w-5 h-4" checked={globalSignOut}
                           onChange={e => setGlobalSignOut(e.currentTarget.checked)} />
                    <label htmlFor="browser-signout" className="leading-[1.03]">
                        Also sign out of your Crooms Bell Schedule account across this browser.</label>
                </div>
            </div>
            <div className={ overlayStyles.actionButtons }>
                <button onClick={(e) => {e.stopPropagation();
                    setIsActiveAction(false);}}>No</button>
                <button onClick={async () => {
                    await eventSignOut()
                    if (globalSignOut) redirect("https://account.croomsbellschedule.com/auth/auto-logout");
                }}>Yes</button>
            </div>
        </div>
    </>;
};