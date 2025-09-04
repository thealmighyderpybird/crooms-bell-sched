"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import prowlerStyles from "~/prowler/prowler.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import Card from "~/components/index/Card";
import styles from "./style.module.css";

interface UserData {
    displayname: string,
    username: string,
    verified: boolean,
    id: string,
}

export default function UserCard({ username }: { username: string }) {
    const [userData, setUserData]: [UserData, Dispatch<SetStateAction<UserData>>]  = useState({
        displayname: "",
        username: "",
        verified: false,
        id: "",
    } as UserData);
    
    useEffect(() => {
        async function doAction() {
            const r = await fetch(CBSHServerURL + "/users/" + username);
            const res = await r.json() as { status: "OK" | "FAILED", data: UserData };
            setUserData(res.data);
        }
        void doAction();
    }, [username]);

    return <Card>
        <div className={ prowlerStyles.corePostHeader } style={{ marginBlockEnd: "0", }}>
            { username /* && data?.id */ ? // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${userData.id}.png&default=pfp`}
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