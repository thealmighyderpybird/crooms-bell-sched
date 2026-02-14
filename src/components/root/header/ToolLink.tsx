"use client";

import { useRouter } from "next/navigation";

export default function ToolLink({ id, link, popup, name }: { id: string, link: string, popup: boolean, name: string }) {
    const router = useRouter();
    return <div className="py-2.5 px-3.75 hover:bg-(--sec) active:bg-(--tri)" tabIndex={1} onClick={() => {
        if (popup) window.open(`/redir?url=${link}`);
        else router.push(`/tool/${id}`)
    }}>
        { name }
    </div>;
};