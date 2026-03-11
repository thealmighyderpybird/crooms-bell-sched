import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import VerificationWizard from "./content";
import Link from "next/link";

export default async function VerificationPage() {
    const { sid } = await getSession();

    const { data } = await (await fetch(CBSHServerURL + "/feed/can-i-post", {
        headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean | "pending" };

    return data === false ? <VerificationWizard sid={sid} /> : <>{ data === true ? <>
        <h2>You are already allowed to post.</h2>
        <p>You can already post on Prowler.</p>
        <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowler">Go to Prowler</Link>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowlerlock">View ProwlerLock Settings</Link>
        </div>
    </> : <>
        <h2>You've already requested access.</h2>
        <p>Please wait while an admin approves your request. This may take up to 5 days, but usually takes less time.</p>
        <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowler">Go to Prowler</Link>
            <Link className="button min-w-28 text-center text-[1rem] transition" href="/prowlerlock">View ProwlerLock Settings</Link>
        </div>
    </>}</>;
};