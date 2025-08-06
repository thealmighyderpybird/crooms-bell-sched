import type { FormEvent } from "react";

export const changeColorMode = (e: FormEvent<HTMLSelectElement>) => {
    const colorScheme = e.currentTarget.value;
    document.querySelector("html")?.classList.remove("dark");
    document.querySelector("html")?.classList.remove("light");
    if (colorScheme !== "") document.querySelector("html")?.classList.add(colorScheme);
};

export const setTheme = (id: string) => {
    document.querySelector("body")!.className = id;
};