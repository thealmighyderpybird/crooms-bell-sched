"use client";

import { type CookieValueTypes, type OptionsType, useGetCookie } from "cookies-next/client";
import type Settings from "~/types/settings";

export default function ExportButton() {
    const getCookie = useGetCookie();
    return <button onClick={() => exportSettings(getSettings(getCookie))}
                   style={{minWidth: "8rem"}}>Export Settings</button>;
};

const exportSettings = (settings: Settings) => {
    const file = new Blob([JSON.stringify(settings)], {type: "application/json"});
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "CBSHSettings.json";
    a.click();

    URL.revokeObjectURL(a.href);
};

const getSettings = (getCookie: (key: string, options?: (OptionsType)) => CookieValueTypes): Settings => {
    function getPeriodNames() {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return JSON.parse(getCookie("periodNames")!.toString());
        } catch {
            return [
                "1st Period",
                "2nd Period",
                "3rd Period",
                "4th Period",
                "5th Period",
                "6th Period",
                "7th Period",
                "Homeroom",
            ];
        }
    }

    return {
        accentColor: getCookie("accentColor")?.toString() ? getCookie("accentColor")!.toString() : "default-accent",
        theme: getCookie("theme") === "dark" ? "dark" : getCookie("theme") === "light" ? "light" : "system",
        font: getCookie("font")?.toString() ? getCookie("font")!.toString() : "SegoeUI",
        defaultLunch: getCookie("defaultLunch") === "B Lunch" ? "B Lunch" : "A Lunch",
        showTimeRemainingRing: getCookie("showTimeRemainingRing") === "true",
        clippy: getCookie("clippy") === "true",
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        periodNames: getPeriodNames(),
    };
}