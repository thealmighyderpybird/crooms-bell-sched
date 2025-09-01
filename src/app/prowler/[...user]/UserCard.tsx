"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import styles from "~/prowler/prowler.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import Card from "~/components/index/Card";

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
        <div className={ styles.corePostHeader }>
            { username /* && data?.id */ ? // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${userData.id}.png&default=pfp`}
                     alt={ username + "'s profile picture" } title={ username + "'s profile picture" }
                     className={ styles.profilePicture } width={32} height={32} /> : null }
            <div className={ styles.corePostHeaderContent }>
                { username &&
                    <div className={ styles.username }>
                        <span>{ username }</span>
                        { userData?.verified ? <Verified size={14} /> : null }
                    </div> }
            </div>
        </div>
    </Card>;
}