import errorStyles from "../components/root/error.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={errorStyles.container}>
            <Image src="/images/clippy.png" draggable="false" alt="Clippy" height={250} width={250} />
            <h1>It looks like you&apos;re lost!</h1>
            <h3>Would you like some help?</h3>
            <Link className={errorStyles.button + " button"} href="/">Go back to the homepage</Link>
        </div>
    )
}