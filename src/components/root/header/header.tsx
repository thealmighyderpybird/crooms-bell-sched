import AnnouncementsTrigger from "~/components/modals/AnnouncementsTrigger";
import getSessionInfo from "~/lib/getSessionInfo";
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
    const sessionInfo = await getSessionInfo(session.sid);

    return <header className="bg-(--pri) fixed top-0 left-0 select-none z-9 min-w-full box-glow-[black]">
        <nav className="flex flex-row flex-nowrap justify-between">
            <div className="flex flex-row flex-nowrap">
                <Link className="flex flex-row flex-nowrap items-center p-2 pl-3 header-cutoff-lg:pr-3.75 hover:bg-(--sec) active:bg-(--tri) no-underline text-inherit"
                      tabIndex={1} href="/">
                    <Image src="/favicon.ico" alt="Logo" draggable="false" priority width={28} height={28}
                           className="header-cutoff-lg:mr-2 w-7 h-7 block" />
                    <span className="hidden header-cutoff-lg:block">Crooms Bell Schedule</span>
                </Link>
                <div className="p-3 flex flex-row flex-nowrap items-center hover:bg-(--sec) active:bg-(--tri) group"
                     id="tools-tab" tabIndex={1}>
                    Tools <ToolsMenu />
                </div>
                <div className="p-3 flex flex-row flex-nowrap items-center hover:bg-(--sec) active:bg-(--tri) group"
                     id="tools-tab" tabIndex={1}>
                    Toys <ToysMenu />
                </div>
                <Link className="p-3 flex flex-row flex-nowrap items-center hover:bg-(--sec) active:bg-(--tri) no-underline text-inherit"
                      id="daily-poll" tabIndex={1} href="/daily-poll">
                    Daily Poll
                </Link>
            </div>
            <div className="flex-row flex-nowrap hidden header-cutoff-sm:flex">
                { osName === "Windows" &&
                <Link href="https://mikhail.croomssched.tech/apps/bellscheduleapp" title="Download the app" tabIndex={1}
                      target="CBSHApp" className="p-3 hidden header-cutoff-md:flex flex-row flex-nowrap items-center hover:bg-(--sec) active:bg-(--tri) no-underline text-inherit group">
                    <div className="flex justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="1.5rem" height="1.5em" style={{ cursor: "inherit" }}>
                            <path d="M17 4a1 1 0 1 0-2 0v16.586l-5.293-5.293a1 1 0 0 0-1.414 1.414l7 7a1 1 0 0 0 1.414 0l7-7a1 1 0 0 0-1.414-1.414L17 20.586zM7 27a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2z"
                                  fill="currentColor" style={{ cursor: "inherit" }} />
                        </svg>
                        <span className="hidden header-cutoff-lx:inline-block">Download the app</span>
                    </div>
                    <div className="hidden group-hover:block absolute top-12.75 bg-(--pri) overflow-y-auto z-10 transform-[translateX(-.75rem)] p-2"
                         style={{ fontSize: "0.8rem", boxShadow: "black 0 10px 10px" }}>Download the app</div>
                </Link>}
                <AnnouncementsTrigger />
                <AccountHeader session={typeof sessionInfo.username === "undefined" ? null : sessionInfo} />
            </div>
        </nav>
    </header>;
}