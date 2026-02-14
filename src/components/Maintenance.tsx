import favicon from "~/../public/favicon.ico";
import spinny from "./spinny.gif";
import Image from "next/image";
import Link from "next/link";

export default async function Maintenance() {
    return <div className="mx-auto py-10 max-w-xl flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 px-5 select-none">
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
                <p className="mb-1">Please consider the following as to why the servers are down:</p>
                <ul className="list-disc mb-4 px-6.5">
                    <li>Your house is painted white.</li>
                    <li>You are trying to be naughty.</li>
                    <li>You are going to a site.</li>
                </ul>
                <p>An admin was asked to provide input, however they responded with <q>{ await getNo() }</q></p>
            </main>
            <section>
                <Image src={spinny.src} width={spinny.width} height={spinny.height} alt="Spinny CBSH" draggable="false"
                       className="mx-auto mt-10 w-1/4 select-none block" />
                <p className="text-center text-xl select-none"><q>The best bell schedule on earth!</q></p>
            </section>
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

const getNo = async () => {
    try {
        return (await (await fetch("https://no.croomssched.tech/api")).json()).reason as string;
    } catch { return "Nah bro, not in the mood today."; }
};