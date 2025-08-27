import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";
import SurveyTool from "./SurveyTool";
import Link from "next/link";

export default async function SurveyPostPage() {
    const { sid } = await getSession();

    return <Card>
        <h2>Share a survey</h2>
        <p>Enter the details about your survey below. <Link href="/prowler/survey/legacy">Use legacy tool.</Link></p>
        <SurveyTool sid={sid} />
    </Card>;
}