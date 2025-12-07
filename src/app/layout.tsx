import Header from "~/components/root/header/header";
import Footer from "~/components/root/footer/footer";
import getSiteSettings from "~/lib/getSettings";
import type { Metadata, Viewport } from "next";
import { AlertProvider } from "~/AlertContext";
import getSession from "~/lib/session.server";
import rootStyles from "./root.module.css";
import Fonts from "~/styles/fonts/fonts";
import { type ReactNode } from "react";
import Script from "next/script";
import "~/styles/master.css";
import ChristmasCorner from "~/components/christmas/main";

export const viewport: Viewport = {
    width: "device-width",
    themeColor: "#690D22",
    initialScale: 1,
    minimumScale: 0.5,
    maximumScale: 2,
};

const title = "Crooms Bell Schedule";
const description = "The Crooms Bell Schedule features an interactive bell schedule applet that keeps track of" +
    " your periods and the time remaining in the period. Stay up-to-date with Quick Bits and connect with others with" +
    " Prowler.";
const keywords = "Crooms, CAIT, CAoIT, Crooms Bell Schedule, Crooms Academy Bell Schedule, Crooms Academy," +
    " Crooms Schedule, Schedule, Bell Schedule, 2024-2025, 2025-2026";

export const metadata: Metadata = {
    title: {
        template: "%s | " + title,
        default: title
    },
    applicationName: title,
    description: description,
    keywords: keywords,
    robots: "index, follow, nositelinkssearchbox",
    icons: [
        {rel: "icon", url: "/favicon.ico"}
    ],
    openGraph: {
        title: title,
        type: "website",
        description: description,
    },
    twitter: {
        site: title,
        title: title,
        description: description,
        card: "summary",
    },
    referrer: "strict-origin-when-cross-origin",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    try {
        const { theme, font, accentColor } = await getSiteSettings();
        const { uid } = await getSession();

        // @ts-expect-error string CAN be used to index via enum
        return <html lang="en" className={ Fonts[font] + parseTheme(theme) }>
            <body className={ accentColor ? parseAccentColor(accentColor, uid) : undefined }>
            <AlertProvider>
                <Header />
                <main className={ rootStyles.main }>{children}</main>
                <Footer />
                <Script src={"https://croomssched.statuspage.io/embed/script.js"} />
                <div id="modal-portal" />
                <ChristmasCorner />
            </AlertProvider>
            </body>
        </html>;
    } catch {
        return <html lang="en" className={ Fonts.SegoeUI }>
            <body>
            <AlertProvider>
                <Header />
                <main className={ rootStyles.main }>{children}</main>
                <Footer />
                <Script src={"https://croomssched.statuspage.io/embed/script.js"} />
                <div id="modal-portal" />
                <ChristmasCorner />
            </AlertProvider>
            </body>
        </html>
    }
};

const parseTheme = (theme: string) => theme ? ` ${theme}` : "";
const parseAccentColor = (accent: string, uid: string) => uid === "kone" ? "pride" : accent;