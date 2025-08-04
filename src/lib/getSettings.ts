import SiteSettings from "~/types/settings";
import { cookies } from "next/headers";

export default async function getSiteSettings(): Promise<SiteSettings> {
    const cookieStore = await cookies();
    return {
        theme: cookieStore.get("theme")!.value === "dark" ? "dark" : cookieStore.get("theme")!.value === "light" ? "light" : "system",
        defaultLunch: cookieStore.get("defaultLunch")?.value === "A Lunch" ? "A Lunch" : "B Lunch",
        showTimeRemainingRing: cookieStore.get("showTimeRemainingRing")?.value === "true",
        periodNames: JSON.parse(cookieStore.get("periodNames")!.value),
        clippy: cookieStore.get("clippy")?.value === "true",
        accentColor: cookieStore.get("accentColor")!.value,
        font: cookieStore.get("font")!.value,
    };
}