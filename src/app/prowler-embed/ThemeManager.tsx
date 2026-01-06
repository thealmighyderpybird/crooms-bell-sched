"use client";

import { useEffect } from "react";

export default function ThemeManager({ theme }: { theme: string }) {
    useEffect(() => {
        document.documentElement.classList.remove("dark", "light", "system");
        if (theme) document.documentElement.classList.add(theme);
    }, []);

    return null;
};