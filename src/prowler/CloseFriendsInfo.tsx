"use client";

import DialogCloseButton from "~/components/dialog/DialogCloseButton";
import overlayStyles from "~/components/dialog/dialog.module.css";
import Link from "next/link";

export default function CloseFriendsInfo({ setActiveAction }: { setActiveAction: (value: boolean) => void }) {
    return <>
        <div className={ overlayStyles.modal } onClick={() => setActiveAction(false)} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth} ${overlayStyles.controlledHeight} ${overlayStyles.separatedContent}`}>
            <DialogCloseButton onClick={() => setActiveAction(false)} />
            <div>
                <h2>Close Friends Post</h2>
                <p>This post is for the uploader's Close Friends, who they picked to see this post.</p>
                <p>We encourage you to respect that this post is for a select few, and to not share it.</p>
                <p>If you want to manage your own Close Friends list, you can update it in <Link target="CBSH_AccountCenter"
                     href="https://account.croomssched.tech/account-center/close-friends">Account Center</Link>.</p>
            </div>
        </div>
    </>;
};