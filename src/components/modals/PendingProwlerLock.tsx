"use client";

import overlayStyles from "../dialog/dialog.module.css";
import Link from "next/link";

export default function ProwlerLockDialog({ setIsActiveAction }: { setIsActiveAction: (arg0: boolean) => void }) {
    return <>
        <div className={overlayStyles.modal} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth}`}>
            <header><h2 style={{ lineHeight: "1" }}>ProwlerLock</h2></header>
            <main>
                <p>Welcome to the Prowler, the Crooms Bell Schedule&apos;s very own social media-like service where you
                    can connect with others.</p>
                <p>You have already completed Basic Verification. Please wait for an admin to review your information.</p>
                <p>If you believe you should be waived from these requirements, please <Link
                    href="mailto:support@croomssched.tech">email our support</Link>.</p>
            </main>
            <footer className={overlayStyles.actionButtons}>
                <button className={overlayStyles.button} onClick={() => setIsActiveAction(false)}>Cancel</button>
                <Link className={"button " + overlayStyles.button} href="/prowlerlock">View ProwlerLock Status</Link>
            </footer>
        </div>
    </>;
}