import ThemeProvider from "~/components/ThemeProvider";
import getSession from "~/lib/session.server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const { sid } = await getSession();
    if (!sid) redirect("/auth/login");
    return <ThemeProvider>{ children }</ThemeProvider>;
};