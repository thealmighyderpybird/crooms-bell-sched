"use client";

import { useEffect, useState, useRef } from "react";
import sanitizeContent from "~/lib/SanitizeContent";
import styles from "~/prowler/prowler.module.css";

export default function Content({ content }: { content: string }) {
    const [needViewMore, setNeedViewMore] = useState(false);
    const [viewingMore, setViewingMore] = useState(false);
    const contentRef = useRef(null);

    const isViewingMore = () => viewingMore ? ` ${styles.viewMore}` : "";

    useEffect(() => {
        // @ts-expect-error clientHeight works even though it isn't explicit
        if (contentRef.current) setNeedViewMore(contentRef.current.clientHeight >= 200)
    }, []);

    return <>
        <div className={ styles.corePostContent + isViewingMore() } dangerouslySetInnerHTML={{ __html: sanitizeContent(content) }}
             ref={contentRef} />
        { needViewMore && <span onClick={() => setViewingMore(!viewingMore)} className={ styles.viewMoreButton }>
            View { !viewingMore ? "More" : "Less" }</span> }
    </>;
};