"use client";

import playerStyles from "./playerStyles.module.css";
import { useState, useRef } from "react";

export interface SourceInfo {
    audio_info: string,
    bitrate: number,
    genre: string,
    listener_peak: number,
    listeners: number,
    listenurl: string,
    server_description: string,
    server_name: string,
    server_type: string,
    server_url: string,
    stream_start: string,
    stream_start_iso8601: string,
    title: string,
    dummy: null
}

export default function RadioPlayer({ source, nowPlaying }: { source: string, nowPlaying: string }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    return <div className={ playerStyles.audioPlayer }>
        { isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={ playerStyles.icon }
                           onClick={() => {setIsPlaying(false); audioRef.current!.muted = true;}}>
            <path d="M6.75 3A2.75 2.75 0 0 0 4 5.75v16.5A2.75 2.75 0 0 0 6.75 25h3a2.75 2.75 0 0 0 2.75-2.75V5.75A2.75 2.75 0 0 0 9.75 3zm11.5 0a2.75 2.75 0 0 0-2.75 2.75v16.5A2.75 2.75 0 0 0 18.25 25h3A2.75 2.75 0 0 0 24 22.25V5.75A2.75 2.75 0 0 0 21.25 3z" />
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={ playerStyles.icon }
                      onClick={() => {setIsPlaying(true); audioRef.current!.muted = false; void audioRef.current!.play()}}>
            <path d="M10.138 3.382C8.304 2.31 6 3.632 6 5.756v16.489c0 2.123 2.304 3.445 4.138 2.374l14.697-8.59c1.552-.907 1.552-3.15 0-4.057z" />
            </svg> }
        <div className={ playerStyles.nowPlaying }>
            { nowPlaying.split(" - ")[1] && <b>{ nowPlaying.split(" - ")[1] }</b> }
            { nowPlaying.split(" - ")[0] && <span>{ nowPlaying.split(" - ")[0] }</span> }
        </div>
        <audio src={source} ref={audioRef} onPlay={() => setIsPlaying(true)} />
    </div>;
}