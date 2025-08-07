import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {
        showTimeRemainingRing,
        defaultLunch,
        periodNames,
        accentColor,
        clippy,
        theme,
        font
    } = await req.json();
    const res = NextResponse.json({ status: "OK" });

    if (showTimeRemainingRing) res.cookies.set("showTimeRemainingRing", showTimeRemainingRing, {
        path: "/", maxAge: 31536000
    });

    if (defaultLunch) res.cookies.set("defaultLunch", defaultLunch, { path: "/", maxAge: 31536000 });
    if (periodNames) res.cookies.set("periodNames", periodNames, { path: "/", maxAge: 31536000 });
    if (accentColor) res.cookies.set("accentColor", accentColor, { path: "/", maxAge: 31536000 });
    if (clippy) res.cookies.set("clippy", clippy, { path: "/", maxAge: 31536000 });
    if (theme) res.cookies.set("theme", theme, { path: "/", maxAge: 31536000 });
    if (font) res.cookies.set("font", font, { path: "/", maxAge: 31536000 });

    return res;
}