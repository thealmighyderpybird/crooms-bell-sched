import { parseTime } from "~/lib/parseEndTime";
import Verified from "~/components/Verified";
import type Post from "~/types/ProwlerPost";
import styles from "./prowler.module.css";
import sanitizeHtml from "sanitize-html";

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

export default function Post({ post }: { post: Post }) {
    const createTime = new Date(post.create);
    return <div data-id={ post.id } className={ styles.corePost }>
        <div className={ styles.corePostHeader }>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${post.uid}.png&default=pfp`}
                 alt={ post.createdBy + "'s profile picture" } title={ post.createdBy + "'s profile picture" }
                 className={ styles.profilePicture } width={32} height={32} />
            <div className={ styles.corePostHeaderContent }>
                <div className={ styles.username }>
                    <span>{ post.createdBy }</span>
                    { post.verified ? <Verified size={15} /> : null }
                </div>
                <span>
                    {monthNames[createTime.getMonth()]} {createTime.getDate()}, {createTime.getFullYear()
                    } {parseTime(new Date(createTime))}
                </span>
            </div>
        </div>
        <div className={ styles.corePostContent } dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.data) }} />
    </div>;
};