import UserCard from "~/app/prowler/[...user]/UserCard";

export default async function Page({ params }: { params: Promise<{ user: string }> }) {
    const username = (await params).user;
    
    return <>
        <UserCard username={username} />
        {username}
    </>;
}