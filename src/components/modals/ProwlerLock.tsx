import overlayStyles from "../dialog/dialog.module.css";
import Link from "next/link";

export default function ProwlerLockDialog() {
    return <>
        <div className={overlayStyles.modal} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth}`}>
            <header><h2 style={{ lineHeight: "1" }}>ProwlerLock</h2></header>
            <main>
                <p>Welcome to the Prowler, the Crooms Bell Schedule&apos;s very own social media-like service where you
                    can connect with others.</p>
                <p>To make sure our platform is safe for everyone, we require that all accounts go through Basic
                    Verification.</p>
                <p>If you believe you should be waived from these requirements, please <Link
                    href="mailto:support@croomssched.tech">email our support</Link>.</p>
            </main>
            <footer className={overlayStyles.actionButtons}>
                <Link className={"button " + overlayStyles.button} href="/">Cancel</Link>
                <Link className={"button " + overlayStyles.button}
                      href="https://community.croomssched.tech/prowler-verification">Start Basic Verification</Link>
            </footer>
        </div>
    </>;
}