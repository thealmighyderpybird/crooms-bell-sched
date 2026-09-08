"use client";

import { useEffect } from "react";

export default function EmbedMode() {
    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const embedParam = params.get('embed');
            const inIframe = window.self !== window.top;

            if (embedParam === '1' || inIframe) {
                document.documentElement.classList.add('embed-mode');
            }
        } catch (e) {
            // ignore (e.g., cross-origin frame access)
        }
    }, []);

    return null;
}
