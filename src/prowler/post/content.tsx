"use client";

import { useEffect, useState, useRef } from "react";
import sanitizeContent from "~/lib/SanitizeContent";
import styles from "~/prowler/prowler.module.css";

export default function Content({ content }: { content: string }) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [needViewMore, setNeedViewMore] = useState(false);
    const [viewingMore, setViewingMore] = useState(false);

    const isViewingMore = () => viewingMore ? ` ${styles.viewMore}` : "";
    const x = () => {
        if (contentRef.current !== null) {
            setNeedViewMore(contentRef.current.clientHeight >= 200);

            for (let i = 0; i < contentRef.current.children.length; i++) {
                if (contentRef.current.children.item(i)!.clientHeight >= 200) setNeedViewMore(true);
            }
        }
    }


    useEffect(() => x(), []);

    return <>
        <div className={ styles.corePostContent + isViewingMore() } dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
             ref={contentRef} onLoad={x} />
        { needViewMore && <span onClick={() => setViewingMore(!viewingMore)} className={ styles.viewMoreButton }>
            View { !viewingMore ? "More" : "Less" }</span> }
    </>;
};