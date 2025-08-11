import styles from "./option.module.css";
import type { ReactNode } from "react";
import Link from "next/link"

export default function SettingsLink({ children, href }: { children: ReactNode, href: string }) {
    return <Link href={href} className={ styles.link }>{ children }</Link>;
};