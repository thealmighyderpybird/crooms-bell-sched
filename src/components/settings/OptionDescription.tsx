import styles from "./option.module.css";
import type { ReactNode } from "react";

export default function OptionDescription({ children }: { children: ReactNode }) {
    return <span className={ styles.optionDescription }>{ children }</span>
};