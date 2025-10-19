import getSession from "~/lib/session.server";
import { redirect } from "next/navigation";
import DocEditor from "./DocEditor";

const approvedUsers = ["admin", "Sunshine_N_Sparkle"];

export default async function DocPage() {
    const { uid } = await getSession();
    if (!uid) redirect("/auth/login");
    if (!approvedUsers.includes(uid)) redirect("/");

    return <div style={{ marginBlockStart: "1rem" }}>
        <DocEditor originalContent={`<span class="rainbow">hi! this document doesn't save at the moment, 
please be patient as we update this system</span>`} />
    </div>
}