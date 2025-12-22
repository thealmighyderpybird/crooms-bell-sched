"use client";

import CloseFriendsInfo from "./CloseFriendsInfo";
import { parseTime } from "~/lib/parseEndTime";
import CroomsPro from "~/components/CroomsPro";
import ActionArea from "~/prowler/actionArea";
import Verified from "~/components/Verified";
import UserCard from "~/components/UserCard";
import type Post from "~/types/ProwlerPost";
import styles from "./prowler.module.css";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Content from "~/prowler/content";
import type User from "~/types/user";
import UserTags from "./UserTags";
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
    const [closeFriendsActive, setCloseFriendsActive] = useState(false);
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

    return <div data-id={ post?.id ? post.id : "" } className={ styles.corePost }>
        <div className={ styles.corePostHeader }>
            <div onMouseOver={() => enableHoverCard()} onMouseOut={() => cancelHoverCard()}>
                <Link className={ styles.corePostHeaderItem } href={"/prowler/" + post.createdBy}>
                    { (post?.createdBy && post?.uid) && // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${post.uid}.png`}
                         alt={ post.createdBy + "'s profile picture" } title={ post.createdBy + "'s profile picture" }
                         className={ styles.profilePicture } width={32} height={32} /> }
                    <div className={ styles.corePostHeaderContent }>
                        { post?.createdBy &&
                        <div className={ styles.username }>
                            <span>{ post.createdBy }</span>
                            { post.verified && <Verified size={14} /> }
                            { (post.verified && post.uid === "ef10ea555a") && <Verified size={14} /> }
                            { post.userTags.includes("croomsPro") && <CroomsPro /> }
                            <UserTags userTagList={post.userTags} />
                        </div> }
                        { post?.create &&
                        <span>
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
            <div onClick={() => setCloseFriendsActive(true)}>
                { post.store === "closeFriends" && <div className={ styles.closeFriends }>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="1rem" height="1rem">
                        <path d="M12.701 3.908c.532-1.078 2.069-1.078 2.6 0l2.692 5.452l6.017.875c1.19.173 1.664 1.634.804 2.473l-4.355 4.244l1.028 5.993c.204 1.185-1.04 2.088-2.103 1.529l-5.382-2.83l-5.382 2.83c-1.064.559-2.307-.344-2.104-1.529l1.028-5.993l-4.355-4.244c-.86-.839-.385-2.3.804-2.473l6.017-.875z"
                              fill="currentColor" />
                    </svg>
                </div> }
                { closeFriendsActive && createPortal(<CloseFriendsInfo setActiveAction={setCloseFriendsActive} post={post} />,
                    document.getElementById("modal-portal")!) }
                <ActionArea session={session} post={post} sid={sid} uid={uid} deviceType={deviceType} />
            </div>
        </div>
        <Content content={post.data} />
    </div>;
};