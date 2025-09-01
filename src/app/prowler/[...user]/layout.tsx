import type { ReactNode } from "react";
import UserCard from "./UserCard";

export default async function Layout({ children, params }: { children: ReactNode, params: Promise<{ user: string }> }) {
    const username = (await params).user;
    
    return <>
        <UserCard username={username} />
        {children}
    </>;
};