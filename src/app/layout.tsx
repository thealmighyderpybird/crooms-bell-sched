import getSiteSettings, { getDefaultSiteSettings } from '~/lib/getSettings';
//import EverythingTrigger from '~/components/everything/Trigger';
import FocusModeTrigger from '~/components/focusMode/Trigger';
import Header from '~/components/root/header/header';
import Footer from '~/components/root/footer/footer';
import Maintenance from '~/components/Maintenance';
import CBSHServerURL from '~/lib/CBSHServerURL';
import type { Metadata, Viewport } from 'next';
import { AlertProvider } from '~/AlertContext';
import getSession from '~/lib/session.server';
import { headers as h } from 'next/headers';
import Fonts from '~/styles/fonts/fonts';
import { userAgent } from 'next/server';
import type { ReactNode } from 'react';
import Script from 'next/script';
import '~/styles/themes/all.css';
import '~/styles/colors.css';
import '~/styles/cursor.css';
import '~/styles/master.css';
import { env } from '~/env';

const maintenance = false;

export const viewport: Viewport = {
    width: 'device-width',
    themeColor: '#690D22',
    initialScale: 1,
    minimumScale: 0.5,
    maximumScale: 2,
};

const title = 'Crooms Bell Schedule';
const description = `Be prepared for your classes with the ${title}. Keep track of your daily schedule and how `+
    'long you have in each class as the day progresses. You\'ll never need another website for school info ever again!';
const keywords = 'Crooms, CAIT, CAoIT, Crooms Bell Schedule, Crooms Academy Bell Schedule, Crooms Academy,' +
    ' Crooms Schedule, Schedule, Bell Schedule, 2023-2024, 2024-2025, 2025-2026, 2026-2027';
const statusPageURL = 'https://croomssched.statuspage.io/embed/script.js';

export const metadata: Metadata = {
    title: {
        template: '%s | ' + title,
        default: title
    },
    applicationName: title,
    description: description,
    keywords: keywords,
    publisher: title,
    robots: 'index, follow, nositelinkssearchbox',
    icons: [
        {rel: 'icon', url: '/favicon.ico'}
    ],
    openGraph: {
        title: title,
        type: 'website',
        description: description,
    },
    twitter: {
        site: title,
        title: title,
        description: description,
        card: 'summary',
    },
    referrer: 'strict-origin-when-cross-origin',
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    try {
        const settings = await getSiteSettings();
        const { sid } = await getSession();

        try {
            if (env.NODE_ENV === 'production') {
                const headers = (sid !== '') ? {
                    'Authorization': JSON.stringify(sid),
                    'Content-Type': 'application/json'
                } : { 'Content-Type': 'application/json' } as HeadersInit;

                const {device, browser, os} = userAgent({headers: await h()});
                const deviceType = device.model ?? 'Unknown';

                if (os != undefined)
                    await fetch(CBSHServerURL + '/usage/website', {
                        body: JSON.stringify({
                            browser: browser.version ? `${browser.name} v${browser.version}` : browser.name,
                            os: os.version ? `${os.name} ${os.version}` : os.name,
                            device: deviceType,
                            time: new Date(),
                        }),
                        method: 'POST',
                        headers,
                    });
            }
        } catch (e) {console.error(e)}

        return <html lang='en' className={Fonts[settings.font] + parseTheme(settings.theme)}>
        <body className={settings.accentColor ?? undefined}>
        {maintenance ? <Maintenance/> : <AlertProvider>
            <Header/>
            <main className='pt-13 pb-7.75'>{children}</main>
            <Footer/>{/*<EverythingTrigger/>*/}
            <Script src={statusPageURL}/>
            <div id='modal-portal'/>
            <FocusModeTrigger settings={settings} />
        </AlertProvider>}
        </body>
        </html>;
    } catch {
        return <html lang='en' className={ Fonts.SegoeUI }>
            <body>
            { maintenance ? <Maintenance /> : <AlertProvider>
                <Header />
                <main className='pt-13 pb-7.75'>{children}</main>
                <Footer />{/*<EverythingTrigger />*/}
                <Script src={statusPageURL} />
                <div id='modal-portal' />
                <FocusModeTrigger settings={getDefaultSiteSettings()} />
            </AlertProvider> }
            </body>
        </html>
    }
};

const parseTheme = (theme: string) => theme ? ` ${theme}` : '';