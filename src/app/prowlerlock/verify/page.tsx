import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import VerificationWizard from "./content";
import Link from "next/link";

export default async function VerificationPage() {
    const { sid } = await getSession();

    const { data } = await (await fetch(CBSHServerURL + "/feed/can-i-post", {
        headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean };

    return !data ? <VerificationWizard sid={sid} /> : <>
        <h2>You are already allowed to post.</h2>
        <p>You can already post on Prowler.</p>
        <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowler">Go to Prowler</Link>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowlerlock">View ProwlerLock Settings</Link>
        </div>
    </>;
};