"use client";

import { setTheme } from "~/lib/settingsManager";
import type { ReactNode } from "react";

export default function ThemeOption({ children, title, id }: { children: ReactNode, title: string, id: string }) {
    return <div onClick={() => setTheme(id)} title={ title }
                className="inline-block select-none w-12.5 h-12.5 rounded-lg">{ children }</div>;
};