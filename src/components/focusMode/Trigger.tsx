"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FocusMode from "./FocusMode";
import type Settings from "~/types/settings";

export default function FocusModeTrigger({ settings }: { settings: Settings }) {
    const [focusMode, setFocusMode] = useState(false);

    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.ctrlKey && e.shiftKey && e.key === "F") setFocusMode(!focusMode);
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    return focusMode && createPortal(<FocusMode settings={settings} />, document.getElementById("modal-portal")!);
}