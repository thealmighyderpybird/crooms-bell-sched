import headerStyles from "./header.module.css";
import getSession from "~/lib/session.server";
import AccountHeader from "./AccountHeader";
import ToolsMenu from "./ToolsMenu";
import ToysMenu from "./ToysMenu";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
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
                <Link href="https://mikhail.croomssched.tech/apps/bellscheduleapp" className={headerStyles.menuItem}
                      title="Download the app." tabIndex={1}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="1.5rem" height="1.5rem"
                         style={{ cursor: "inherit" }}>
                        <path d="M21 2a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0V8h-3a1 1 0 1 1 0-2h3V3a1 1 0 0 1 1-1M6 3a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3h-7V6a3 3 0 0 0-3-3zm7 10H5V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1zm2 10v-8h7a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1zm-2 0H6a1 1 0 0 1-1-1v-7h8z"
                              fill="currentColor" style={{ cursor: "inherit" }} />
                    </svg>
                </Link>
                <AccountHeader session={session} />
            </div>
        </nav>
    </header>;
}