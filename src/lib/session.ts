"use client";

import { useGetCookie } from "cookies-next/client";

export const setSession = async (session: { uid: string, sid: string }) => {
    await fetch("/api/session", {
        method: "POST",
        body: JSON.stringify(session),
        headers: { "Content-Type": "application/json" },
    });
};

export const useGetSession = () => {
    const getCookie = useGetCookie();
    const uid = getCookie("uid")?.toString();
    const sid = getCookie("sid")?.toString();
    return { uid, sid };
};