import styles from "./card.module.css";
import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
    return <div className={ styles.card }>{ children }</div>;
};