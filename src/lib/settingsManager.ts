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

    for (let fontsKey in fonts) {
        // @ts-expect-error dynamic string can't be used to index string enum
        document.querySelector("html")?.classList.remove(fonts[fontsKey]);
    }

    // @ts-expect-error dynamic string can't be used to index string enum
    document.querySelector("html")?.classList.add(fonts[font]);
    void saveSettings({ font: font });
};