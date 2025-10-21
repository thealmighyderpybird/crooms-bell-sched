import indexStyles from "../../app/index.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import CardHeader from "../index/CardHeader";
import Surveys from "~/prowler/surveyRoot";
import type User from "~/types/user";
import Prowler from "~/prowler/root";
import Card from "../index/Card";
import Link from "next/link";

export default async function SocialWidget() {
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

    return <>
        <Surveys />
        <Card>
            <CardHeader>Prowler</CardHeader>
            <Link href="/prowler/post" className={ indexStyles.sharePostLink }>Share a post</Link>
            <Prowler sid={sid} uid={uid} session={user} />
        </Card>
    </>;
};