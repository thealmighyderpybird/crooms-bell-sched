import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import Header from "~/app/index-components/header/header";
import rootStyles from "./root.module.css";
import {type Metadata} from "next";
import Head from "next/head";
import "~/styles/master.css";

export const metadata: Metadata = {
    title: "Crooms Bell Schedule",
    description: "The Crooms Bell Schedule features an interactive bell schedule applet that keeps track of your periods and the time remaining in the period. Stay up-to-date with information with Quick Bits and Weather, and connect with other students with the Feed.",
    icons: [{rel: "icon", url: "/favicon.ico"}],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <AppRouterCacheProvider>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport"
                      content="width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=2"/>
                <meta name="referrer" content="strict-origin-when-cross-origin"/>
                <title>Crooms Bell Schedule</title>
                <meta name="application-name" content="Crooms Bell Schedule"/>
                <meta name="description"
                      content="The Crooms Bell Schedule features an interactive bell schedule applet that keeps track of your periods and the time remaining in the period. Stay up-to-date with information with Quick Bits and Weather, and connect with other students with the Feed."/>
                <meta name="keywords"
                      content="Crooms, CAIT, CAoIT, Crooms Bell Schedule, Crooms Academy Bell Schedule, Crooms Academy, Crooms Schedule, Schedule, Bell Schedule, 2024-2025"/>
                <meta name="author" content="Andrew Jennings"/>
                <link rel="manifest" href="/manifest.json"/>
                <meta name="theme-color" content="#690D22"/>
                <meta name="og:description"
                      content="The Crooms Bell Schedule features an interactive bell schedule applet that keeps track of your periods and the time remaining in the period. Stay up-to-date with information with Quick Bits and Weather, and connect with other students with the Feed."/>
                <meta property="og:image" content="/favicon.ico"/>
                <meta property="og:title" content="Crooms Bell Schedule"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="robots" content="index, follow, nositelinkssearchbox"/>
            </Head>
            <body>
                <Header />
                <main className={rootStyles.main}>{children}</main>
            </body>
        </AppRouterCacheProvider>
        </html>
    );
};