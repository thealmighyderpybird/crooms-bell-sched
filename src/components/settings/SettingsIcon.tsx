import styles from "./option.module.css";
import type { ReactNode } from "react";
import iconList from "./iconList";

export default function SettingsIcon({ icon, viewBox = 28 }: { icon: string, viewBox?: number }): ReactNode {
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBox} ${viewBox}`} className={ styles.icon }>{ iconList[icon] }</svg>;
};