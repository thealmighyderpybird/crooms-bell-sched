"use client";

import styles from "./accountHeader.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import headerStyles from "./header.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Verified from "~/components/Verified";

interface CBSHUserAPIResponse {
    status: "OK" | "FAILED",
    data: CBSHUser
}

interface CBSHUser {
    error: string,
    code: string,
    id: string,
    username: string,
    displayname: string,
    role: "user" | "mod" | "admin",
    verified: boolean,
    providers: CBSHProvider[],
}

interface CBSHProvider {
    id: string,
    email: string,
    name: string,
    image: string,
}

export default function AccountHeader({ session }: { session: { uid: string | undefined, sid: string | undefined } }) {
    const [sessionInfo, setSessionInfo] = useState({
        error: "",
        code: "",
        id: "",
        username: "",
        displayname: "",
        role: "user",
        verified: false,
        providers: [{ id: "", name: "", email: "", image: "" }],
});
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function doAction() {
            setSessionInfo(await getSessionInfo(session.sid))
        }
        void doAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <div className={`${headerStyles.menuItem} ${styles.accountButton}`}
             onClick={() => {
                 if (session.sid !== "") setIsTrayOpen(toggleIsTrayOpen(isTrayOpen));
                 else router.push("/auth/login");
             }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?default=pfp&name=${session.uid}.png`}
                 alt={"Profile Picture"} className={ styles.profilePicture } />
            <div className={ styles.accountDetails }>
                { sessionInfo?.displayname ?? (sessionInfo?.username ? `@${sessionInfo.username}` : "Sign In") }
                { sessionInfo?.verified && <Verified size={15} /> }
            </div>
        </div>
        { isTrayOpen && <div className={ styles.accountPopout }>
            <div className={ styles.accountPopoutCard }>
                <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?default=pfp&name=${session.uid}.png`}
                     alt={"Profile Picture"} className={ styles.profilePicture } />
                <div>
                    <h2>
                        { sessionInfo?.displayname ?? `@${sessionInfo.username}` }
                        { sessionInfo?.verified && <Verified size={16} /> }
                    </h2>
                    { sessionInfo.displayname && <span> @{sessionInfo.username}</span> }
                </div>
            </div>
        </div> }
    </>
};

const getSessionInfo = async (sid: string | undefined) => {
    const r = await fetch(CBSHServerURL + "/users/userDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(sid)
        },
    });
    const res = await r.json() as CBSHUserAPIResponse;
    return res.data;
};

const toggleIsTrayOpen = (isTrayOpen: boolean) => !isTrayOpen;