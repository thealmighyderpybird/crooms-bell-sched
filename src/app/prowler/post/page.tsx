import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";
import { redirect } from "next/navigation";
import PostPage from "./PostPage";
import Link from "next/link";

export default async function ProwlerPost() {
    const session = await getSession();
    if (!session.uid || !session.sid) redirect("/auth/login");

    return <Card>
        <h2>Share a Post</h2>
        <p>By posting something, you agree to not club baby seals.</p>
        <p>You also agree to the <Link href="/terms">Terms of Service</Link>.</p>
        <PostPage session={session} />
    </Card>
};