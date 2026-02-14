"use client";

import CardHeader from "~/components/index/CardHeader";
import parseEndTime from "~/lib/parseEndTime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AlertInfo({ alertId }: { alertId: string | undefined }) {
    const [alertInfo, setAlertInfo] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (!alertId) router.push("/not-found");
        fetch("https://api.weather.gov/alerts/" + alertId)
            .then(r => r.json())
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            .then(r => setAlertInfo(r.properties))
            .catch(() => router.push("/not-found"));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return alertInfo ? <>
        { /* @ts-expect-error event, ends, and expires not included in generic type */ }
        <CardHeader>{ alertInfo.event }</CardHeader>
        <ul className="p-0 list-none">
            { /* @ts-expect-error event, ends, and expires not included in generic type */ }
            <li><b>Issued by:</b> { alertInfo.senderName }</li>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-argument *//* @ts-expect-error not included in generic type */ }
            <li><b>Expires:</b> { parseEndTime(new Date(alertInfo.ends), new Date(alertInfo.expires)) }</li>
        </ul>
        { /* @ts-expect-error event, ends, and expires not included in generic type */ }
        <pre className="break-after-all mb-0 overflow-x-auto">{ alertInfo.description }</pre>
    </> : null;
}