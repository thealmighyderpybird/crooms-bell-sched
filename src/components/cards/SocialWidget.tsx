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
        { widgetSettings.surveys && <Surveys /> }
        { widgetSettings.prowler && <Card>
            <CardHeader>Prowler</CardHeader>
            <SharePostLink sid={sid} canIPost={canIPostRes.data}>Share a post</SharePostLink>
            <Prowler sid={sid} uid={uid} session={user} />
        </Card> }
    </>;
};