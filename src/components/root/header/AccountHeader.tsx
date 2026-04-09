"use client";

import type { CBSHUser } from "~/lib/getSessionInfo";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LogoutModal from "./LogoutModal";
import Link from "next/link";

export default function AccountHeader({ session }: { session: CBSHUser | null }) {
    const [logoutModal, setLogoutModal] = useState(false);
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.querySelector("body > main")!
            .addEventListener("click", () => setIsTrayOpen(false));
        return () => document.querySelector("body > main")!
            .removeEventListener("click", () => setIsTrayOpen(false));
    }, []);

    useEffect(() => {
        document.querySelector("body > footer")!
            .addEventListener("click", () => setIsTrayOpen(false));
        return () => document.querySelector("body > footer")!
            .removeEventListener("click", () => setIsTrayOpen(false));
    }, []);

    if (session === null) return <div className="p-3 flex flex-row flex-nowrap items-center justify-end hover:bg-(--sec) active:bg-(--tri)"
                                      onClick={() => {router.push("/auth/login")}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${CBSHServerURL}/users/profile-picture/null`} alt="Profile Picture" draggable="false"
             className="rounded-full aspect-square w-7 h-7 pointer-events-none" />
        <div className="hidden header-cutoff-lx:flex flex-row items-center gap-1 pl-1.25">Sign In</div>
    </div>

    return <>
        <div className="p-3 flex flex-row flex-nowrap items-center justify-end hover:bg-(--sec) active:bg-(--tri)"
             onClick={() => setIsTrayOpen(!isTrayOpen)}>
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
        { isTrayOpen && <div className="bg-(--pri) rounded-xl fixed top-16 right-2.5 box-glow-[black]">
            <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://mikhail.croomsbellschedule.com/apiv2/fs/profile_banner/${session.id}.png`}
                     alt={(session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Banner"}
                     title={(session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Banner"}
                     className="rounded-t-xl aspect-9/5 h-50 pointer-events-none block" draggable="false" />
                <Link className="absolute inset-0 flex justify-center items-center bg-(--background)/60 rounded-t-xl opacity-0 hover:opacity-100 text-(--main)"
                      href="https://account.croomsbellschedule.com/account-center/profile-banner?change"
                      target="CBSHAccountCenter_Banner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 28 28" style={{ cursor: "inherit" }}>
                        <path d="M24.85 3.15a3.93 3.93 0 0 0-5.561 0L4.503 17.937c-.44.44-.76.986-.928 1.586l-1.547 5.525a.75.75 0 0 0 .924.924l5.524-1.547a3.6 3.6 0 0 0 1.587-.928L24.85 8.71a3.93 3.93 0 0 0 0-5.56m-4.5 1.06a2.432 2.432 0 1 1 3.439 3.44l-1.54 1.539l-3.439-3.44zm-2.6 2.6l3.44 3.44L9.002 22.437a2.1 2.1 0 0 1-.93.544l-4.241 1.187l1.187-4.24a2.13 2.13 0 0 1 .544-.93z"
                              fill="currentColor" style={{ cursor: "inherit" }} />
                    </svg>
                </Link>
            </div>
            <div className="px-4 pt-4 flex flex-row flex-nowrap items-center gap-2">
                <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`${CBSHServerURL}/users/profile-picture/${session.id}`}
                         alt={(session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                         title={(session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                         className="rounded-full aspect-square w-13 h-13 pointer-events-none block" draggable="false" />
                    <Link className="absolute inset-0 flex justify-center items-center bg-(--background)/60 rounded-full opacity-0 hover:opacity-100 text-(--main)"
                          href="https://account.croomsbellschedule.com/account-center/profile-picture?change"
                          target="CBSHAccountCenter_ProfilePicture">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 28 28" style={{ cursor: "inherit" }}>
                            <path d="M24.85 3.15a3.93 3.93 0 0 0-5.561 0L4.503 17.937c-.44.44-.76.986-.928 1.586l-1.547 5.525a.75.75 0 0 0 .924.924l5.524-1.547a3.6 3.6 0 0 0 1.587-.928L24.85 8.71a3.93 3.93 0 0 0 0-5.56m-4.5 1.06a2.432 2.432 0 1 1 3.439 3.44l-1.54 1.539l-3.439-3.44zm-2.6 2.6l3.44 3.44L9.002 22.437a2.1 2.1 0 0 1-.93.544l-4.241 1.187l1.187-4.24a2.13 2.13 0 0 1 .544-.93z"
                                  fill="currentColor" style={{ cursor: "inherit" }} />
                        </svg>
                    </Link>
                </div>
                <div>
                    <h2 className="flex items-center gap-0.5 leading-none">
                        { session.displayname ? session.displayname : `@${session.username}` }
                        { session.verified && <Verified size={16} /> }
                    </h2>
                    { session.displayname && <span className="leading-none">@{session.username}</span> }
                </div>
            </div>
            <div className="mt-4 px-4 pb-4 flex flex-row flex-nowrap gap-1">
                <Link href="https://account.croomsbellschedule.com/account-center" target="CBSHAccountCenter"
                      className="button w-full text-[1rem] leading-none text-center"
                      onClick={() => setIsTrayOpen(false)}>Account Center</Link>
                <button className="w-full text-[1rem] leading-none" onClick={() => setLogoutModal(true)}>Sign Out</button>
            </div>
        </div> }
        { logoutModal && createPortal(<LogoutModal setIsActiveAction={setLogoutModal} />,
            document.getElementById("modal-portal")!) }
    </>
};