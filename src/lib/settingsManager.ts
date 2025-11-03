import defaultWidgetSettings from "~/lib/defaultWidgetSettings";
import type Settings from "~/types/settings";
import fonts from "~/styles/fonts/fonts";
import type { FormEvent } from "react";

const saveSettings = async (settings: Partial<Settings>) => {
    await fetch("/api/settings", {
        method: "POST",
        body: JSON.stringify(settings),
        headers: { "Content-Type": "application/json" },
    });
};

export const changeColorMode = (e: FormEvent<HTMLSelectElement>) => {
    const colorScheme = e.currentTarget.value;
    document.querySelector("html")?.classList.remove("dark");
    document.querySelector("html")?.classList.remove("light");
    document.querySelector("html")?.classList.remove("system");
    if (colorScheme !== "") document.querySelector("html")?.classList.add(colorScheme);
    // @ts-expect-error string color scheme not proper type
    void saveSettings({ theme: colorScheme });
};

export const setTheme = (id: string) => {
    document.querySelector("body")!.className = id;
    void saveSettings({ accentColor: id });
};

export const changeFont = (e: FormEvent<HTMLSelectElement>) => {
    const font = e.currentTarget.value;

    for (const fontsKey in fonts) {
        // @ts-expect-error dynamic string can't be used to index string enum
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        document.querySelector("html")?.classList.remove(fonts[fontsKey]);
    }

    // @ts-expect-error dynamic string can't be used to index string enum
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    document.querySelector("html")?.classList.add(fonts[font]);
    void saveSettings({ font: font });
};

export const changeDefaultLunch = (e: FormEvent<HTMLSelectElement>) => {
    const defaultLunch = e.currentTarget.value;
    if (defaultLunch === "A Lunch" || defaultLunch === "B Lunch")
        void saveSettings({ defaultLunch: defaultLunch });
};

export const setProgressBar = (enabled: boolean) => {
    void saveSettings({ showTimeRemainingRing: enabled });
};

export const updatePeriodNames = (periodNames: string[]) => {
    void saveSettings({ periodNames: JSON.stringify([
            periodNames[0] ?? "1st Period",
            periodNames[1] ?? "2nd Period",
            periodNames[2] ?? "3rd Period",
            periodNames[3] ?? "4th Period",
            periodNames[4] ?? "5th Period",
            periodNames[5] ?? "6th Period",
            periodNames[6] ?? "7th Period",
            periodNames[7] ?? "Homeroom",
        ])
    });
};

export const resetSettings = () => {
    void saveSettings({
        widgets: defaultWidgetSettings,
        accentColor: "default-accent",
        showTimeRemainingRing: true,
        defaultLunch: "A Lunch",
        theme: "system",
        font: "SegoeUI",
        clippy: false,
        periodNames: JSON.stringify([
            "1st Period",
            "2nd Period",
            "3rd Period",
            "4th Period",
            "5th Period",
            "6th Period",
            "7th Period",
            "Homeroom",
        ])
    })
};