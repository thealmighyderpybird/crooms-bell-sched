import getSession from "~/lib/session.server";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
    const { uid, sid } = await getSession();
    if (!uid || !sid) redirect("/auth/login");

    return <div className="flex flex-col min-h-main justify-center items-center select-none" data-account-uid={uid}>
        <div className="bg-(--pri) p-5 rounded-3xl w-108 min-h-121 relative box-glow-[black]">{ children }</div>
    </div>;
};