import ClientProwlerLock from "~/components/modals/ClientProwlerLock";
import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";
import {redirect} from "next/navigation";
import SurveyTool from "./SurveyTool";

export default async function SurveyPostPage() {
    const { sid } = await getSession();

    if (sid === "") redirect("/auth/login");
    const res = await (await fetch(CBSHServerURL + "/feed/can-i-post", {
        headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean };

    return <Card>
        <h2>Share a survey</h2>
        <p>Enter the details about your survey below.</p>
        <SurveyTool sid={sid} />
        <ClientProwlerLock allowed={res.data} />
    </Card>;
}