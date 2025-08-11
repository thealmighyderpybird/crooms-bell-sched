import { NextResponse } from "next/server";
import type Settings from "~/types/settings";

export async function POST(req: Request) {
    const {
        showTimeRemainingRing,
        defaultLunch,
        periodNames,
        accentColor,
        clippy,
        theme,
        font
    } = await req.json() as Settings;

    const showProgressBar = showTimeRemainingRing ? "true" : "false";
    const showClippy = clippy ? "true" : "false";

    const res = NextResponse.json({ status: "OK" });

    if (showProgressBar) res.cookies.set("showTimeRemainingRing", showProgressBar, {
        path: "/", maxAge: 31536000
    });

    if (defaultLunch) res.cookies.set("defaultLunch", defaultLunch, { path: "/", maxAge: 31536000 });
    if (periodNames) res.cookies.set("periodNames", periodNames, { path: "/", maxAge: 31536000 });
    if (accentColor) res.cookies.set("accentColor", accentColor, { path: "/", maxAge: 31536000 });
    if (showClippy) res.cookies.set("clippy", showClippy, { path: "/", maxAge: 31536000 });
    if (theme) res.cookies.set("theme", theme, { path: "/", maxAge: 31536000 });
    if (font) res.cookies.set("font", font, { path: "/", maxAge: 31536000 });

    return res;
}