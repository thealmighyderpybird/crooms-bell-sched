import styles from "./option.module.css";
import type { ReactNode } from "react";
import iconList from "./iconList";

export default function SettingsIcon({ icon }: { icon: string }): ReactNode {
    // @ts-expect-error string can't be used to index enum of strings according to ts
    return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" className={ styles.icon }>{ iconList[icon] }</svg>;
};