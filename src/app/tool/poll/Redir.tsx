"use client";

import CBSHServerURL from "~/lib/CBSHServerURL";
import { useEffect } from "react";

export default function PollClientSideRedirTool() {
    useEffect(() => {
        fetch(CBSHServerURL + "/infofetch/daily-poll")
            .then(r => r.json())
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
            .then(d => d.data)
            .then(url => {
                if (typeof url === "string") window.location.href = url;
                else window.location.href = "/tool/poll/error"
            })
            .catch(() => window.location.href = "/tool/poll/error");
    }, []);

    return null;
};