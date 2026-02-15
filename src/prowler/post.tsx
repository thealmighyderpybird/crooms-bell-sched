"use client";

import { parseTime } from "~/lib/parseEndTime";
import CroomsPro from "~/components/CroomsPro";
import Verified from "~/components/Verified";
import UserCard from "~/components/UserCard";
import type Post from "~/types/ProwlerPost";
import ActionArea from "./post/actionArea";
import styles from "./prowler.module.css";
import { useRef, useState } from "react";
import UserTags from "./post/UserTags";
import Content from "./post/content";
import type User from "~/types/user";
import Link from "next/link";

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export default function Post({ post, session, sid, uid, deviceType }: { post: Post, session: User, sid: string, uid: string, deviceType: string }) {
    const [hoverCardActive, setHoverCardActive] = useState(false);
    const sleeper = useRef(setTimeout(() => {}, 1));

    const enableHoverCard = () => {
        sleeper.current = setTimeout(() => setHoverCardActive(true), 1000);
    };

    const cancelHoverCard = () => {
        clearTimeout(sleeper.current);
        disableHoverCard();
    }

    const disableHoverCard = () => setHoverCardActive(false);

    return <div className="bg-(--sec) rounded-lg p-2" data-id={ post?.id ? post.id : "" }>
        <div className={ styles.corePostHeader }>
            <div onMouseEnter={() => enableHoverCard()} onMouseLeave={() => cancelHoverCard()}>
                <Link className={ styles.corePostHeaderItem } href={"/prowler/" + post.createdBy}>
                    { (post?.createdBy && post?.uid) && // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${post.uid}.png`}
                         alt={ post.createdBy + "'s profile picture" } title={ post.createdBy + "'s profile picture" }
                         className={ styles.profilePicture } width={32} height={32} /> }
                    <div className={ styles.corePostHeaderContent }>
                        { post?.createdBy &&
                        <div className={ styles.username }>
                            <span className={(post.uid === uid ? "opaque" : "")}>{ post.createdBy }</span>
                            { post.verified && <Verified size={14} /> }
                            { (post.verified && post.uid === "ef10ea555a") && <Verified size={14} /> }
                            { post.userTags.includes("croomsPro") && <CroomsPro /> }
                            <UserTags userTagList={post.userTags} />
                        </div> }
                        { post?.create &&
                        <span className={(post.uid === uid ? "opaque" : "")}>
                            {monthNames[new Date(post.create).getMonth()]} {new Date(post.create).getDate()},
                            {new Date(post.create).getFullYear()} {parseTime(new Date(post.create))}
                        </span> }
                    </div>
                </Link>
                { hoverCardActive && <div className={ styles.hoverCard } onMouseOut={() => disableHoverCard()}>
                    <UserCard userData={{
                        croomsPro: post.userTags.includes("croomsPro"),
                        displayName: post.displayName,
                        username: post.createdBy,
                        verified: post.verified,
                        pronouns: post.pronouns,
                        id: post.uid,
                    }} /></div> }
            </div>
            <ActionArea session={session} post={post} sid={sid} uid={uid} />
        </div>
        <Content content={post.data} />
        { deviceType && <></> }
    </div>;
};