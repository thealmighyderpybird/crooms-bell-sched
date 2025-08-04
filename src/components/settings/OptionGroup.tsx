import styles from "./option.module.css";
import type { ReactNode } from "react";

export default function OptionGroup({ children }: { children: ReactNode }) {
    return <div className={ styles.optionGroup }>{ children }</div>;
};