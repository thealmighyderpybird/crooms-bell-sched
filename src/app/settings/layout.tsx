import CardLayout from "~/components/index/CardLayout";
import styles from "./settings.module.css";
import type { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <h1 className={ styles.header }>Settings</h1>
        { children }
    </CardLayout>;
}