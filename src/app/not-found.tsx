import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return <div className="flex flex-col justify-center items-center max-w-fit mx-auto select-none text-center"
                style={{ height: "calc(100vh - 84px)" }}>
        <Image src="/images/clippy.png" draggable="false" alt="Clippy" height={250} width={250}
               className="w-62.5 h-auto mb-4 p-4 rounded-lg bg-(--pri)" />
        <h1>It looks like you&apos;re lost!</h1>
        <h3>Would you like some help?</h3>
        <Link className="mt-4 button" href="/">Go back to the homepage</Link>
    </div>;
};