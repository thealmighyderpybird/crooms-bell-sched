import styles from "./option.module.css";
import type { ReactNode } from "react";

export default function OptionHeader({ children }: { children: ReactNode }) {
    return <span className={ styles.optionHeader }>{ children }</span>
};