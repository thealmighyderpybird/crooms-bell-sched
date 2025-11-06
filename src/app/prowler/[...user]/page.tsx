import UserCard from "~/app/prowler/[...user]/UserCard";
import CardHeader from "~/components/index/CardHeader";
import CBSHServerURL from "~/lib/CBSHServerURL";
import ProwlerRoot from "~/prowler/rootByUser";
import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";
import type User from "~/types/user";

export default async function Page({ params }: { params: Promise<{ user: string }> }) {
    const username = (await params).user;
    const { sid, uid } = await getSession();

    try {
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
            <UserCard username={username} />
            <Card>
                <CardHeader>Posts</CardHeader>
                <ProwlerRoot sid={sid} uid={uid} session={user} user={username} />
            </Card>
        </>;
    }
    catch {
        <>
            <UserCard username={username} />
            <Card>
                <CardHeader>Posts</CardHeader>
                <p>Unable to connect to server</p>
            </Card>
        </>;
    }
}