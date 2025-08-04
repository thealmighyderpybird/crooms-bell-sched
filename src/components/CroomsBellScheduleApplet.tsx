"use client";

import Script from "next/script";

export default function CroomsBellScheduleApplet({ id }: { id: string }) {
    return <>
        <div id={"cbsh-application-" + id}></div>
        <Script src="/sched/schedule.js" onLoad={() => // @ts-expect-error not explicitly defined, but exists.
            createCBSHSched(document.getElementById("cbsh-application-" + id))} />
    </>;
};