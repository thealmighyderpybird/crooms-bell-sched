import type { ChangeEvent } from "react";

export const changeColorMode = (e: ChangeEvent<HTMLSelectElement>) => {
    const colorScheme = e.target.value;
    document.querySelector("html")?.classList.remove("dark");
    document.querySelector("html")?.classList.remove("light");
    if (colorScheme !== "") document.querySelector("html")?.classList.add(colorScheme);
};

export const setTheme = (id: string) => {
    document.querySelector("body")!.className = id;
};