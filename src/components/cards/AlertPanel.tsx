"use client";

import parseEndTime from "~/lib/parseEndTime";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Alert {
    properties: {
        id: string,
        ends: string,
        event: string,
        expires: string
    }
}

const activeZone = "https://api.weather.gov/alerts/active?zone=FLC117";
//const activeZone = "https://api.weather.gov/alerts/active?area=FL";

export default function AlertPanel() {
    const [alerts, setAlerts] = useState<Alert[]>([]);

    useEffect(() => {
        fetch(activeZone).then(r => r.json() as Promise<{ features: Alert[] }>).then(r => setAlerts(r.features))
            .catch(e => console.error(e));
        const interval = setInterval(() => {
            fetch(activeZone).then(r => r.json() as Promise<{ features: Alert[] }>).then(r => setAlerts(r.features))
                .catch(e => console.error(e));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return alerts.length !== 0 ? <div className="mt-2.5 mb-5 select-none rounded-xl w-full border border-(--accent-color)">
        <div className="bg-(--accent-color) text-(--pri) rounded-t-xl p-0.5 flex justify-center items-center">
            Active Alerts</div>
        <ul className="my-5 text-left px-10">
            { alerts.map((alert: Alert) => {
                const { properties } = alert;
                return <li key={properties.id}><Link className="no-underline text-(--main) flex justify-between"
                                                     href={`/alerts?id=${properties.id}`}>
                    { properties.event } until { parseEndTime(new Date(properties.ends), new Date(properties.expires)) }
                    <svg className="w-4 h-4 ml-1.25 fill-current align-middle inline-block" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 12 12">
                        <path d="M1.5 6a.5.5 0 0 1 .5-.5h6.793L6.146 2.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L8.793 6.5H2a.5.5 0 0 1-.5-.5" />
                    </svg></Link>
                </li>
            }) }
        </ul>
    </div> : null;
};