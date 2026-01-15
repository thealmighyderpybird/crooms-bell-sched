import getSessionInfo from "~/lib/getSessionInfo";
import getSession from "~/lib/session.server";
import ThemeManager from "./ThemeManager";
import ProwlerRoot from "~/prowler/root";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import styles from "./app.module.css";
import "./app.css";

export default async function ProwlerEmbed({ searchParams }: { searchParams: Promise<{ theme: string }> }) {
    const { uid, sid } = await getSession();
    const session = await getSessionInfo(sid);
    const { theme } = await searchParams;
    let deviceType: string;

    try {
        const { device } = userAgent({ headers: await headers() });
        deviceType = device.type ?? "Unknown";
    } catch {
        deviceType = "Unknown";
    }

    return <div className={ styles.prowlerEmbed }>
        <ProwlerRoot sid={sid} uid={uid} session={session} deviceType={deviceType} />
        <ThemeManager theme={theme} />
    </div>
};