import type { WidgetSettings } from "~/types/settings";
import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import CardHeader from "../index/CardHeader";
import SharePostLink from "./SharePostLink";
import Surveys from "~/prowler/surveyRoot";
import type User from "~/types/user";
import Prowler from "~/prowler/root";
import Card from "../index/Card";

export default async function SocialWidget({ widgetSettings }: { widgetSettings: WidgetSettings }) {
    try {
        const { sid, uid } = await getSession();
        const r = await fetch(CBSHServerURL + "/users/userDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": JSON.stringify(sid)
            }
        });
        const res = await r.json() as { status: "OK" | "FAILED", data: User };
        const user = res.data;

        const canIPostRes = await (await fetch(CBSHServerURL + "/feed/can-i-post", {
            headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
        })).json() as { status: "OK" | "FAILED", data: boolean };

        return <>
            {widgetSettings.surveys && <Surveys />}
            {widgetSettings.prowler && <Card>
                <CardHeader>Prowler</CardHeader>
                <SharePostLink sid={sid} canIPost={canIPostRes.data}>Share a post</SharePostLink>
                <Prowler sid={sid} uid={uid} session={user} />
            </Card>}
        </>;
    }
    catch {
        return <Card>
            <div style={{ marginBlockStart: "0.5rem", userSelect: "none" }}>
                <div style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="6rem" height="6rem">
                        <path d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
                              fill="url(#fluentColorDismissCircle480)" />
                        <path d="m17.782 16.025l.102.091L24 22.233l6.116-6.117a1.25 1.25 0 0 1 1.666-.091l.102.091a1.25 1.25 0 0 1 .091 1.666l-.091.102L25.767 24l6.117 6.116a1.25 1.25 0 0 1 .091 1.666l-.091.102a1.25 1.25 0 0 1-1.666.091l-.102-.091L24 25.767l-6.116 6.117a1.25 1.25 0 0 1-1.666.091l-.102-.091a1.25 1.25 0 0 1-.091-1.666l.091-.102L22.233 24l-6.117-6.116a1.25 1.25 0 0 1-.091-1.666l.091-.102a1.25 1.25 0 0 1 1.666-.091"
                              fill="url(#fluentColorDismissCircle481)" />
                        <defs>
                            <linearGradient x1="10.25" x2="36.5" y1="6.5" y2="45.25" gradientUnits="userSpaceOnUse"
                                            id="fluentColorDismissCircle480">
                                <stop stopColor="#F83F54"></stop>
                                <stop offset="1" stopColor="#CA2134"></stop>
                            </linearGradient>
                            <linearGradient x1="16.708" x2="25.3" y1="24.729" y2="33.663" gradientUnits="userSpaceOnUse"
                                            id="fluentColorDismissCircle481">
                                <stop stopColor="#FDFDFD"></stop>
                                <stop offset="1" stopColor="#FECBE6"></stop>
                            </linearGradient>
                        </defs>
                    </svg>
                    <h2>Prowler Error</h2>
                    <p style={{ textAlign: "center" }}>There was an issue connecting to Prowler.</p>
                    <p><a className="button" href="">Try again</a></p>
                </div>
            </div>
        </Card>
    }
};