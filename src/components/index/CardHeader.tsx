import styles from "./card.module.css";
import type { ReactNode } from "react";

export default function CardHeader({ children }: { children: ReactNode }) {
    return <h3 className={ styles.header }>{ children }</h3>;
};