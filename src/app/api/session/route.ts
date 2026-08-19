import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimiter";

const IP_LIMIT = 5; // max requests per window
const BROWSER_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: Request) {
    const body = await req.json() as { uid?: string, sid?: string };
    const { uid, sid } = body;
    if (!uid || !sid) return NextResponse.json({ status: "INVALID" });

    // determine client IP
    const ip = (req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || req.headers.get("remote_addr") || "unknown").split(",")[0].trim();

    // browser id: prefer sid from body
    const browserId = sid || "unknown_browser";

    const ipKey = `ip:${ip}`;
    const browserKey = `browser:${browserId}`;

    const ipCheck = checkRateLimit(ipKey, IP_LIMIT, WINDOW_MS);
    if (!ipCheck.allowed) {
        return NextResponse.json({ status: "TOO_MANY_REQUESTS", reason: "RATE_LIMIT_IP", retryAfterMs: ipCheck.resetAfterMs }, { status: 429 });
    }

    const browserCheck = checkRateLimit(browserKey, BROWSER_LIMIT, WINDOW_MS);
    if (!browserCheck.allowed) {
        return NextResponse.json({ status: "TOO_MANY_REQUESTS", reason: "RATE_LIMIT_BROWSER", retryAfterMs: browserCheck.resetAfterMs }, { status: 429 });
    }

    const res = NextResponse.json({ status: "OK" });

    res.cookies.set("uid", uid, { path: "/", maxAge: 31536000 });
    res.cookies.set("sid", sid, { path: "/", maxAge: 31536000 });

    return res;
}