import favicon from "~/../public/favicon.ico";
import spinny from "./spinny.gif";
import Image from "next/image";
import Link from "next/link";

export default function Maintenance() {
    return <div className="mx-auto py-10 max-w-xl flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 px-5">
            <header className="flex flex-row justify-center items-center gap-2 mb-5 select-none">
                <Image src={favicon.src} width={favicon.width} height={favicon.height} draggable="false"
                       alt="Crooms Bell Schedule Logo" className="block w-15 h-auto pointer-events-none" />
                <h1 className="override-header-[white] leading-none">Crooms Bell Schedule</h1>
            </header>
            <main>
                <h2>Server maintenance in progress!</h2>
                <p>
                    We are currently in the process of upgrading important server infrastructure,
                    please check our <Link href="https://croomssched.statuspage.io" target="Statuspage">
                    Statuspage</Link> for more information on our maintenance progress.
                </p>
                <Image src={spinny.src} width={spinny.width} height={spinny.height} alt="Spinny CBSH" draggable="false"
                       className="mx-auto mt-10 w-1/4 select-none block" />
                <p className="text-center text-xl select-none"><q>The best schedule on earth!</q></p>
            </main>
        </div>
        <div className="flex flex-row justify-center gap-4 text-xs opacity-50 mt-5 px-4 select-none">
            <Link href="https://mikhail.croomssched.tech" target="MH"
                  className="text-white">MikhailHosting</Link>
            <Link href="/terms" target="TOS"
                  className="text-white">Terms of Service</Link>
            <Link href="/privacy" target="PRIVACY"
                  className="text-white">Privacy Policy</Link>
            <span>&copy; Crooms Bell Schedule 2026</span>
        </div>
    </div>;
}