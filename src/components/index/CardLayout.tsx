import styles from "./card.module.css";
import type { ReactNode } from "react";

export default function CardLayout({ children }: { children: ReactNode }) {
    return <div className={ styles.layout }>{ children }</div>;
};