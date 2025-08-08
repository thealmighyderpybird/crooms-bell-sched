"use client";

import CBSHServerURL from "~/lib/CBSHServerURL";
import { useEffect } from "react";

export default function PollClientSideRedirTool() {
    useEffect(() => {
        fetch(CBSHServerURL + "/infofetch/poll")
            .then(r => r.json())
            .then(d => d.status)
            .then(url => {
                if (typeof url === "string") window.location.href = url;
                else window.location.href = "/tool/poll/error"
            })
            .catch(() => window.location.href = "/tool/poll/error");
    }, []);

    return null;
};