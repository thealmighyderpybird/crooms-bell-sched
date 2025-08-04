import styles from "./option.module.css";
import type { ReactNode } from "react";

export default function SettingsOption({ children }: { children: ReactNode }) {
    return <div className={ styles.option }>{ children }</div>;
};