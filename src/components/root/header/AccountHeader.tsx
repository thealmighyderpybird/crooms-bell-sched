"use client";

import styles from "./accountHeader.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import headerStyles from "./header.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Verified from "~/components/Verified";

export default function AccountHeader({ session }: { session: { uid: string | undefined, sid: string | undefined } }) {
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const [sessionInfo, setSessionInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        async function doAction() {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setSessionInfo(await getSessionInfo(session.sid))
        }
        void doAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <div className={`${headerStyles.menuItem} ${styles.accountButton}`}
             onClick={() => {
                 if (session) setIsTrayOpen(true);
                 else router.push("/auth/login");
             }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?default=pfp&name=${session.uid}.png`}
                 alt={"Profile Picture"} className={ styles.profilePicture } />
            <div className={ styles.accountDetails }>
                { sessionInfo?.displayname ?? (sessionInfo?.username ? `@${sessionInfo.username}` : "Sign In") }
                { sessionInfo?.verified ? <Verified size={15} /> : null }
            </div>
        </div>
    </>
};

const getSessionInfo = async (sid) => {
    const r = await fetch(CBSHServerURL + "/users/userDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(sid)
        },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await r.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    return res.data;
};