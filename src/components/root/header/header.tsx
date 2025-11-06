import AnnouncementsTrigger from "~/components/modals/AnnouncementsTrigger";
import headerStyles from "./header.module.css";
import getSession from "~/lib/session.server";
import AccountHeader from "./AccountHeader";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import ToolsMenu from "./ToolsMenu";
import ToysMenu from "./ToysMenu";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
    const { os } = userAgent({ headers: await headers() });
    const osName = os.name ?? "Unknown";
    const session = await getSession();

    return <header className={headerStyles.header}>
        <nav className={headerStyles.nav}>
            <div className={headerStyles.navChild}>
                <Link className={headerStyles.menuItem + " " + headerStyles.appLogoParent} tabIndex={1} href="/">
                    <Image src={"/favicon.ico"} alt={"Logo"} draggable={"false"} className={headerStyles.appLogoChild}
                           width={28} height={28} priority={true} />
                    <span>Crooms Bell Schedule</span>
                </Link>
                <div id="tools-tab" tabIndex={1} className={headerStyles.menuItem}>
                    Tools <ToolsMenu/>
                </div>
                <div id="games-tab" tabIndex={1} className={headerStyles.menuItem}>
                    Toys <ToysMenu/>
                </div>
                <Link id="daily-poll" tabIndex={1} className={headerStyles.menuItem} href="/daily-poll">
                    Daily Poll
                </Link>
            </div>
            <div className={headerStyles.navChild + " right"}>
                { osName === "Windows" &&
                <Link href="https://mikhail.croomssched.tech/apps/bellscheduleapp" className={headerStyles.menuItem}
                      title="Download the app" tabIndex={1} target="CBSHApp">
                    <div className={headerStyles.download}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5rem" height="1.5em" style={{ cursor: "inherit" }}>
                            <path d="M17 4a1 1 0 1 0-2 0v16.586l-5.293-5.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414L17 20.586zM7 27a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2z"
                                  fill="currentColor" style={{ cursor: "inherit" }} />
                        </svg>
                        <span>Download the app</span>
                    </div>
                    <div className={headerStyles.subMenu} style={{ padding: "0.5rem", fontSize: "0.8rem" }}>Download the app</div>
                </Link>}
                <AnnouncementsTrigger />
                <AccountHeader session={session} />
            </div>
        </nav>
    </header>;
}