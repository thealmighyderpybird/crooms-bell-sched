import styles from "~/app/index.module.css";
import type { HTMLProps } from "react";

export default function AdFrame(props: HTMLProps<HTMLIFrameElement>) {
    return <iframe src="https://ad.croomssched.tech" height={175} className={ styles.ad } {...props}></iframe>
};