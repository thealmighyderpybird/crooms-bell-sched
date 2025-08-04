"use client";

import { usePathname } from "next/navigation";
import styles from "./settings.module.css"

export default function OptionalHeaderForSubpages() {
    const pathname = usePathname().slice(10);
    if (pathname !== "")
        return <h3 className={styles.subheader}>{ pathname.at(0)?.toUpperCase() + pathname.slice(1) }</h3>;
    else return <h3 className={styles.subheader}>Home</h3>
};