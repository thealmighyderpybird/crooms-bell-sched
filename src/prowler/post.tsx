import sanitizeContent from "~/lib/SanitizeContent";
import { parseTime } from "~/lib/parseEndTime";
import Verified from "~/components/Verified";
import type Post from "~/types/ProwlerPost";
import styles from "./prowler.module.css";
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

export default function Post({ post }: { post: Post }) {
    return <div data-id={ post?.id ? post.id : "" } className={ styles.corePost }>
        <Link className={ styles.corePostHeader } href={"/prowler/" + post.createdBy}>
            { post?.createdBy && post?.uid ? // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${post.uid}.png`}
                 alt={ post.createdBy + "'s profile picture" } title={ post.createdBy + "'s profile picture" }
                 className={ styles.profilePicture } width={32} height={32} /> : null }
            <div className={ styles.corePostHeaderContent }>
                { post?.createdBy &&
                <div className={ styles.username }>
                    <span>{ post.createdBy }</span>
                    { post.verified ? <Verified size={14} /> : null }
                </div> }
                { post?.create &&
                <span>
                    {monthNames[new Date(post.create).getMonth()]} {new Date(post.create).getDate()},
                    {new Date(post.create).getFullYear()} {parseTime(new Date(post.create))}
                </span> }
            </div>
        </Link>
        <div className={ styles.corePostContent } dangerouslySetInnerHTML={{ __html: sanitizeContent(post.data) }} />
    </div>;
};