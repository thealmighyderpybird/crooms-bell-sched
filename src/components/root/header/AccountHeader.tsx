"use client";

import type { CBSHUser } from "~/lib/getSessionInfo";
import { eventSignOut } from "~/lib/ssrSession";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AccountHeader({ session }: { session: CBSHUser | null }) {
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const router = useRouter();

    if (session === null) return <div className="p-3 flex flex-row flex-nowrap items-center justify-end hover:bg-(--sec) active:bg-(--tri)"
                                      onClick={() => {router.push("/auth/login")}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CBSHServerURL}/users/profile-picture/null`} alt="Profile Picture" draggable="false"
             className="rounded-full aspect-square w-7 h-7 pointer-events-none" />
        <div className="hidden header-cutoff-lx:flex flex-row items-center gap-1 pl-1.25">Sign In</div>
    </div>

    return <>
        <div className="p-3 flex flex-row flex-nowrap items-center justify-end hover:bg-(--sec) active:bg-(--tri)"
             onClick={() => setIsTrayOpen(toggleIsTrayOpen(isTrayOpen))}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${CBSHServerURL}/users/profile-picture/${session.id}`} draggable="false"
                 alt={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                 title={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                 className="rounded-full aspect-square w-7 h-7 pointer-events-none" />
            <div className="hidden header-cutoff-lx:flex flex-row items-center gap-1 pl-1.25">
                { session.displayname !== "" ? session.displayname : `@${session.username}` }
                { session.verified && <Verified size={15} /> }
            </div>
        </div>
        { isTrayOpen && <div className="bg-(--pri) p-4 fixed top-12.75 right-0" style={{ boxShadow: "black 0 10px 10px" }}>
            <div className="flex flex-row flex-nowrap justify-center items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${CBSHServerURL}/users/profile-picture/${session.id}`} draggable="false"
                     alt={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                     title={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                     className="rounded-full aspect-square w-13 h-13 pointer-events-none" />
                <div>
                    <h2 className="flex items-center gap-0.5 leading-none">
                        { session.displayname ? session.displayname : `@${session.username}` }
                        { session.verified && <Verified size={16} /> }
                    </h2>
                    { session.displayname && <span className="leading-none">@{session.username}</span> }
                </div>
            </div>
            <div className="mt-2 flex flex-col flex-nowrap">
                <Link href="https://account.croomssched.tech/account-center" target="CBSHAccountCenter"
                      className="w-fit">Manage your account</Link>
                <Link href="#" className="w-fit" onClick={() => {
                    void eventSignOut();
                    router.refresh();
                }}>Sign out</Link>
            </div>
        </div> }
    </>
};

const toggleIsTrayOpen = (isTrayOpen: boolean) => !isTrayOpen;