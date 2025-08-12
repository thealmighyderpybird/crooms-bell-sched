"use client";

import { getDateTime } from "~/lib/schedule";
import { useState, useEffect } from "react";

export default function FeedAndUpdateRotation() {
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        setCurrentTime(getDateTime());
        setTimeout(() => {
            setInterval(() => setCurrentTime(getDateTime()), 1000);
        }, new Date().getMilliseconds());
    }, []);

    return <>{ currentTime.split(/(?<=^\S+)\s/)[1] }</>
};