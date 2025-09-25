"use client";

import CBSHServerURL from "~/lib/CBSHServerURL";
import { useEffect } from "react";

export default function PollClientSideRedirTool() {
    useEffect(() => {
        /* fetch(CBSHServerURL + "/infofetch/daily-poll")
            .then(r => r.json())
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
            .then(d => d.data)
            .then(url => {
                if (typeof url === "string") window.location.href = url;
                else window.location.href = "/tool/poll/error"
            })
            .catch(() => window.location.href = "/tool/poll/error"); */
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSdCrAq6MwApik7roO2LvmTy74Su2hSJ0UbHv3TVcFBn3qyQdA/viewform",
            "daily-poll", "status=0,toolbar=0,location=0,menubar=0,scrollbars=1,height=800,width=600");
        window.location.href = "/tool/poll/new-tab";
    }, []);

    return null;
};