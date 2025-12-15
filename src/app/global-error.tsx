"use client";

import CroomsBellScheduleLogo from "~/components/CBSHLogo";
import type { Properties } from "csstype";
import fonts from "~/styles/fonts/fonts";
import Link from "next/link";

const styles: Record<string, Properties<string | number, string & {}>> = {
    main: {
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "32rem",
        display: "flex",
        height: "100vh",
        margin: "auto",
        gap: "1rem",
    }, content: {
        userSelect: "none",
    }, pre: {
        wordBreak: "break-word",
        userSelect: "text",
        maxWidth: "32rem",
        overflowX: "auto",
    }, digest: {
        fontSize: "0.75rem",
        marginBlockEnd: 0,
    }, button: {
        padding: "0.65rem 0.85rem",
        fontSize: "0.9rem",
        lineHeight: 1,
    }
}

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
    return <html className={ fonts.SegoeUI }>
        <body style={ styles.main }>
            <CroomsBellScheduleLogo size={48} />
            <div style={ styles.content }>
                <h1>Something really bad happened</h1>
                <p>A severe issue with the Crooms Bell Schedule occurred.</p>
                <p>To assist us in resolving the issue, please <Link href="mailto:support@croomssched.tech">
                    send us a report</Link> with what you were doing, and the information below.</p>
                <pre style={ styles.pre }>
                    { error.stack }
                </pre>
                <p style={ styles.digest }>Digest: { error.digest }</p>
            </div>
            <button style={ styles.button } onClick={() => window.location.reload()}>Try again</button>
        </body>
    </html>;
}