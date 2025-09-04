import UserCard from "~/app/prowler/[...user]/UserCard";
import CardHeader from "~/components/index/CardHeader";
import ProwlerRoot from "~/prowler/rootByUser";
import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";

export default async function Page({ params }: { params: Promise<{ user: string }> }) {
    const username = (await params).user;
    const { sid } = await getSession();
    
    return <>
        <UserCard username={username} />
        <Card>
            <CardHeader>Posts</CardHeader>
            <ProwlerRoot sid={sid} user={username} />
        </Card>
    </>;
}