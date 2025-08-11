import styles from "./themeProvider.module.css";
import type { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
    return <div className={ styles.provider }>
        { children }
    </div>;
};