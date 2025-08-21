import indexStyles from "../../app/index.module.css";
import getSession from "~/lib/session.server";
import CardHeader from "../index/CardHeader";
import Prowler from "~/prowler/root";
import Card from "../index/Card";
import Link from "next/link";

export default async function ProwlerWidget() {
    const { sid } = await getSession();

    return <Card>
        <CardHeader>Prowler</CardHeader>
        <Link href="/prowler/post" className={ indexStyles.sharePostLink }>Share a post</Link>
        <Prowler sid={sid} />
    </Card>;
};