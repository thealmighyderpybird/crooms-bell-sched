import styles from "./Apps.module.css";
import appList from "./appList.json";
import Link from "next/link";

type App = { title: string, iconSrc: string, appUrl: string };
export default function Apps() {
    return <div className={styles.list}>{ (appList as { list: App[] }).list.map((app: App, index: number) =>
    <Link href={app.appUrl} key={index} target={app.title} className={styles.link}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={app.iconSrc} alt={app.title} className={styles.img} />
        <h3 className={styles.title}>{app.title}</h3>
    </Link>)}</div>;
}