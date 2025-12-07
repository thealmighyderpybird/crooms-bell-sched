import { useCallback, useEffect, useState } from "react";
import streamServerURL from "~/lib/StreamServerURL";
import RadioPlayer from "~/app/radio/RadioPlayer";
import CBSHServerURL from "~/lib/CBSHServerURL";

export default function ChristmasRadio() {
    const [title, setTitle] = useState("");

    const getStreamTitle = useCallback(async () => {
        const r = await fetch(CBSHServerURL + "/radio/title");
        if (!r.ok) { setTitle("The stream may be offline. - An error occurred"); return; }
        const title = await r.json() as { title: string };
        setTitle(title.title);
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void getStreamTitle(), []);
    useEffect(() => {
        const i = setInterval(() => void getStreamTitle(), 15000);
        return () => clearInterval(i);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <RadioPlayer source={streamServerURL + "/stream"} nowPlaying={title} />
}