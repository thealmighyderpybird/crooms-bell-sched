import styles from "./option.module.css";
import type { ReactNode } from "react";

export default function SettingsGroup({ children }: { children: ReactNode }) {
    return <div className={ styles.group }>
        { children }
    </div>;
};