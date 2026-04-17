import getSessionInfo from "~/lib/getSessionInfo";
import CBSHServerURL from "~/lib/CBSHServerURL";
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

    const canIPostRes = await (await fetch(CBSHServerURL + "/prowler/can-i-post", {
        headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean | "pending" };
    const canIPost = (canIPostRes.status === "FAILED" ? false : canIPostRes.data);

    try {
        const { device } = userAgent({ headers: await headers() });
        deviceType = device.type ?? "Unknown";
    } catch {
        deviceType = "Unknown";
    }

    return <div className={ styles.prowlerEmbed }>
        <ProwlerRoot sid={sid} uid={uid} session={session} deviceType={deviceType} canIPost={canIPost} />
        <ThemeManager theme={theme} />
    </div>
};