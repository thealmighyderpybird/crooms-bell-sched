"use client";

import { setTheme } from "~/lib/settingsManager";
import styles from "./theme.module.css";
import type { ReactNode } from "react";

export default function ThemeOption({ children, title, id }: { children: ReactNode, title: string, id: string }) {
    return <div onClick={() => setTheme(id)} title={ title } className={ styles.theme }>{ children }</div>;
};