import type SiteSettings from "~/types/settings";
import { cookies } from "next/headers";

export default async function getSiteSettings(): Promise<SiteSettings> {
    const cookieStore = await cookies();
    return {
        theme: cookieStore.get("theme")?.value === "dark" ? "dark" : cookieStore.get("theme")?.value === "light" ? "light" : "system",
        accentColor: cookieStore.get("accentColor")?.value ? cookieStore.get("accentColor")!.value : "default-accent",
        defaultLunch: cookieStore.get("defaultLunch")?.value === "A Lunch" ? "A Lunch" : "B Lunch",
        font: cookieStore.get("font")?.value ? cookieStore.get("font")!.value : "SegoeUI",
        showTimeRemainingRing: cookieStore.get("showTimeRemainingRing")?.value === "true",
        clippy: cookieStore.get("clippy")?.value === "true",
        periodNames: getPeriodNames(),
    };

    function getPeriodNames() {
        try {
            return cookieStore.get("periodNames")!.value;
        } catch {
            return JSON.stringify([
                "1st Period",
                "2nd Period",
                "3rd Period",
                "4th Period",
                "5th Period",
                "6th Period",
                "7th Period",
                "Homeroom",
            ]);
        }
    }
}