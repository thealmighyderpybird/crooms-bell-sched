import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { uid, sid } = await req.json() as { uid: string, sid: string };
    if (!uid || !sid) return NextResponse.json({ status: "INVALID" });

    const res = NextResponse.json({ status: "OK" });

    res.cookies.set("uid", uid, { path: "/", maxAge: 31536000 });
    res.cookies.set("sid", sid, { path: "/", maxAge: 31536000 });

    return res;
}