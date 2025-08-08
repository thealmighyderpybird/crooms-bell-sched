import styles from "./theme.module.css";
import type { ReactNode } from "react";

export default function ThemeGrid({ children }: { children: ReactNode }) {
    return <div className={ styles.grid }>{ children }</div>;
};