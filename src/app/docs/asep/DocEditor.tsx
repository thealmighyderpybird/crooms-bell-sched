"use client";

import LiveEdit from "~/components/LiveEdit";
import { useState } from "react";

export default function DocEditor({ originalContent }: { originalContent: string }) {
    const [content, setContent] = useState(originalContent);

    return <>
        <LiveEdit onChange={(c) => setContent(c)} value={content} />
    </>;
};