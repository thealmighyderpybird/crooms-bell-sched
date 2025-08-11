"use client";

import styles from "./styles/alertPanel.module.css";
import parseEndTime from "~/lib/parseEndTime";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    const [alerts, setAlerts] = useState([]);
    const router = useRouter();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        fetch(activeZone).then(r => r.json()).then(r => setAlerts(r.features))
            .catch(e => console.error(e));
        const interval = setInterval(() => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
            fetch(activeZone).then(r => r.json()).then(r => setAlerts(r.features))
                .catch(e => console.error(e));
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return alerts.length !== 0 ? <div className={styles.container}>
        <div className={styles.header}>Active Alerts</div>
        <ul className={styles.list}>
            { alerts.map((alert: Alert) => {
                const { properties } = alert;
                return <li key={ properties.id } onClick={() => router.push("/alert?id=" + properties.id)}>
                    { properties.event } until { parseEndTime(new Date(properties.ends), new Date(properties.expires)) }
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className={ styles.arrow }>
                        <path d="M1.5 6a.5.5 0 0 1 .5-.5h6.793L6.146 2.854a.5.5 0 1 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L8.793 6.5H2a.5.5 0 0 1-.5-.5" />
                    </svg>
                </li>
            }) }
        </ul>
    </div> : null;
};