"use client";

import ChristmasRadio from "~/components/christmas/Radio";
import { useCallback, useState, useEffect } from "react";
import streamServerURL from "~/lib/StreamServerURL";
import type { SourceInfo } from "./RadioPlayer";
import styles from "./styles.module.css";

export default function RadioPage() {
    const [streamInfo, setStreamInfo] = useState({
        audio_info: "",
        bitrate: 0,
        genre: "",
        listener_peak: 0,
        listeners: 0,
        listenurl: "",
        server_description: "",
        server_name: "",
        server_type: "",
        server_url: "",
        stream_start: "",
        stream_start_iso8601: "",
        title: "",
        dummy: null
    } satisfies SourceInfo);

    const getStreamInfo = useCallback(async () => {
        const r = await fetch(streamServerURL + "/status-json.xsl");
        const { icestats } = await r.json() as { icestats: { source: SourceInfo } };
        setStreamInfo(icestats.source);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void getStreamInfo(), []);

    return <>
        <p>Listen in to our available streams.</p>
        <div className={ styles.cardHolder }>
            <div className={ styles.cardItem }>
                <div className={ styles.cardHeader + " " + getHeaderTheme(streamInfo?.server_name ?? "none") } />
                <div className={ styles.cardItemContent }>
                    <h2>{ streamInfo?.server_name ?? "Stream offline" }</h2>
                    <p>{ streamInfo?.server_description ?? "This stream is offline. Please check back later." }</p>
                    <ChristmasRadio />
                </div>
            </div>
        </div>
    </>;
};

const getHeaderTheme = (streamName: string) => {
    switch (streamName) {
        case "A Crooms Christmas": return styles.christmas;
        case "Crooms Christmas": return styles.christmas;
        default: return styles.defaultHeader;
    }
};