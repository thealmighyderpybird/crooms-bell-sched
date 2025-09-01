export default async function Page({ params }: { params: Promise<{ user: string }> }) {
    const username = (await params).user;
    
    return <>
        {username}
    </>;
}