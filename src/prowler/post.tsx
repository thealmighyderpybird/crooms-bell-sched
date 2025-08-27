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
    return <div data-id={ post?.id ? post.id : "" } className={ styles.corePost }>
        <div className={ styles.corePostHeader }>
            { post?.createdBy && post?.uid ? // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${post.uid}.png&default=pfp`}
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
        </div>
        <div className={ styles.corePostContent } dangerouslySetInnerHTML={{ __html: sanitizeHtml(post?.data, {
            allowedTags: [
                "address", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "blockquote", "dd", "div",
                "dl", "dt", "figcaption", "figure", "hr", "li", "main", "ol", "p", "pre", "img",
                "ul", "a", "abbr", "b", "bdi", "bdo", "br", "cite", "code", "data", "dfn",
                "em", "i", "kbd", "mark", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp",
                "small", "span", "strong", "sub", "sup", "time", "u", "var", "wbr", "caption",
                "col", "colgroup", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "rainbow"
            ],
            disallowedTagsMode: "discard",
            allowedAttributes: {
                a: [ "href", "name", "target" ],
                img: [ "src", "srcset", "alt", "title", "width", "height", "loading" ],
                "*": [ "mention" ]
            },
            allowedClasses: {
                a: [ "links" ],
            },
            selfClosing: [ "img", "br", "hr", "area", "base", "basefont", "input" ],
            // URL schemes we permit
            allowedSchemes: [ "http", "https", "ftp", "mailto", "tel" ],
            allowedSchemesByTag: {},
            allowedSchemesAppliedToAttributes: [ "href", "src", "cite" ],
            allowProtocolRelative: true,
            enforceHtmlBoundary: false,
            parseStyleAttributes: true
        }) }} />
    </div>;
};