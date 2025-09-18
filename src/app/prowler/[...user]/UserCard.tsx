"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import prowlerStyles from "~/prowler/prowler.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import Card from "~/components/index/Card";
import styles from "./style.module.css";

type UserData = ErrorData & {
    displayname: string,
    username: string,
    verified: boolean,
    id: string,
}

interface ErrorData {
    error: string,
    code: string,
}

export default function UserCard({ username }: { username: string }) {
    const [userData, setUserData]: [UserData, Dispatch<SetStateAction<UserData>>]  = useState({
        displayname: "",
        username: "",
        verified: false,
        id: "",
        code: "",
        error: "",
    } as UserData);
    
    useEffect(() => {
        async function doAction() {
            const r = await fetch(CBSHServerURL + "/users/" + username);
            const res = await r.json() as { status: "OK" | "FAILED", data: UserData };
            setUserData(res.data);
        }
        void doAction();
    }, [username]);

    if (userData.code === "ERR_USER_NOT_FOUND") {
        return <Card>
        <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="10rem" height="10rem">
                <g fill="none">
                    <path fill="url(#fluentColorPerson480)" d="M12.25 28A4.25 4.25 0 0 0 8 32.249V33c0 3.756 1.942 6.567 4.92 8.38C15.85 43.163 19.786 44 24 44s8.15-.837 11.08-2.62C38.058 39.567 40 36.756 40 33v-.751A4.25 4.25 0 0 0 35.75 28z" />
                    <path fill="url(#fluentColorPerson481)" d="M12.25 28A4.25 4.25 0 0 0 8 32.249V33c0 3.756 1.942 6.567 4.92 8.38C15.85 43.163 19.786 44 24 44s8.15-.837 11.08-2.62C38.058 39.567 40 36.756 40 33v-.751A4.25 4.25 0 0 0 35.75 28z" />
                    <path fill="url(#fluentColorPerson482)" d="M24 4c-5.523 0-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10S29.523 4 24 4" />
                    <defs>
                        <linearGradient id="fluentColorPerson480" x1="15.61" x2="20.779" y1="30.127" y2="46.635"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset=".125" stopColor="#9C6CFE"></stop>
                            <stop offset="1" stopColor="#7A41DC"></stop>
                        </linearGradient>
                        <linearGradient id="fluentColorPerson481" x1="24" x2="31.238" y1="26.095" y2="53.143"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#885EDB" stopOpacity="0"></stop>
                            <stop offset="1" stopColor="#E362F8"></stop>
                        </linearGradient>
                        <linearGradient id="fluentColorPerson482" x1="18.756" x2="28.949" y1="6.659" y2="22.934"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset=".125" stopColor="#9C6CFE"></stop>
                            <stop offset="1" stopColor="#7A41DC"></stop>
                        </linearGradient>
                    </defs>
                </g>
            </svg>
            <h2 style={{ userSelect: "none" }}>User not found</h2>
        </div>
        </Card>;
    }

    return <Card>
        { username && userData?.id ? // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://mikhail.croomssched.tech/apiv2/fs/profile_banner/${userData.id}.png`}
                 alt={ username + "'s profile banner" } title={ username + "'s profile banner" }
                 className={ prowlerStyles.profileBanner + " " + prowlerStyles.userPageBanner } /> : null }
        <div className={ prowlerStyles.corePostHeader } style={{ marginBlockEnd: "0", }}>
            { username && userData?.id ? // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${userData.id}.png`}
                     alt={ username + "'s profile picture" } title={ username + "'s profile picture" }
                     className={ prowlerStyles.profilePicture } width={64} height={64} /> : null }
            <div className={`${prowlerStyles.corePostHeaderContent} ${styles.userContainer} ${styles.header}`}>
                { username &&
                    <div className={ styles.userContainer }>
                        <h2>{ userData.displayname ? userData.displayname : `@${username}` }</h2>
                        <span>
                            { userData.displayname && <span>@{username}</span> }
                            { userData?.verified && <Verified size={16} /> }
                        </span>
                    </div> }
            </div>
        </div>
    </Card>;
}