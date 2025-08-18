import indexStyles from "../../app/index.module.css";
import CardHeader from "../index/CardHeader";
import Prowler from "~/prowler/root";
import Card from "../index/Card";
import Link from "next/link";

export default function ProwlerWidget() {
    return <Card>
        <CardHeader>Prowler</CardHeader>
        <Link href="/prowler/post" className={ indexStyles.sharePostLink }>Share a post</Link>
        <Prowler />
    </Card>;
};