"use client";

import { useRouter } from "next/navigation";

export default function RedirectRequester({ url }: { url: string }) {
    const router = useRouter();
    router.push(url);
    return null;
}