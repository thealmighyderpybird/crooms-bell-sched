"use client";

import { useCallback, useState, useEffect } from "react";
import streamServerURL from "~/lib/StreamServerURL";
import type { SourceInfo } from "./RadioPlayer";
import styles from "./styles.module.css";
import RadioPlayer from "./RadioPlayer";

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
    const [title, setTitle] = useState(streamInfo.title);

    const getStreamInfo = useCallback(async () => {
        const r = await fetch(streamServerURL + "/status-json.xsl");
        const { icestats } = await r.json() as { icestats: { source: SourceInfo } };
        setStreamInfo(icestats.source);
    }, []);

    const getStreamTitle = useCallback(async () => {
        const r = await fetch("/api/radio/title/stream");
        if (!r.ok) { setTitle("An error occurred"); return; }
        const title = await r.json() as { title: string };
        setTitle(title.title);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void getStreamInfo(), []);

    useEffect(() => {
        const i = setInterval(() => void getStreamTitle(), 15000);
        return () => clearInterval(i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>
        <p>Listen in to our available streams.</p>
        <div className={ styles.cardHolder }>
            <div className={ styles.cardItem }>
                <div className={ styles.cardItemContent }>
                    <h2>{ streamInfo.server_name }</h2>
                    <p>{ streamInfo.server_description }</p>
                    <RadioPlayer source={streamServerURL + "/stream"} nowPlaying={title} />
                </div>
            </div>
        </div>
    </>;
};