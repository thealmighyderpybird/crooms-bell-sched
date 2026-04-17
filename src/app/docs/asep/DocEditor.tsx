"use client";

import LiveEdit from "~/components/LiveEdit";
import { useState } from "react";

export default function DocEditor({ originalContent }: { originalContent: string }) {
    const [content, setContent] = useState(originalContent);

    return <>
        <LiveEdit onChangeAction={(c) => setContent(c)} value={content} />
    </>;
};