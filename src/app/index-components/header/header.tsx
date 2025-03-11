import headerStyles from "./header.module.css";
import ToolsMenu from "./ToolsMenu";
import ToysMenu from "./ToysMenu";
import Link from "next/link";

export default function Header() {
    return (
        <header className={headerStyles.header}>
            <nav className={headerStyles.nav}>
                <div className={headerStyles.navChild}>
                    <div className={headerStyles.menuItem + " " + headerStyles.appLogoParent} tabIndex={1}>
                        <img src={"/favicon.ico"} alt={"Logo"} draggable={"false"} className={headerStyles.appLogoChild}/>
                        <span>Crooms Bell Schedule</span>
                    </div>
                    <div id="tools-tab" tabIndex={1} className={headerStyles.menuItem}>
                        Tools <ToolsMenu/>
                    </div>
                    <div id="games-tab" tabIndex={1} className={headerStyles.menuItem}>
                        Toys <ToysMenu/>
                    </div>
                    <div id="daily-poll" tabIndex={1} className={headerStyles.menuItem}>
                        Daily Poll
                    </div>
                </div>
                <div className={headerStyles.navChild + " right"}>
                    <Link href={"/download"} tabIndex={1} className={headerStyles.menuItem}>
                        Download the App
                    </Link>
                </div>
            </nav>
        </header>
    )
}