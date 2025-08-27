import CardHeader from "~/components/index/CardHeader";
import indexStyles from "~/app/index.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import Card from "~/components/index/Card";
import styles from "./surveys.module.css";
import Link from "next/link";

interface Survey {
    id: string,
    name: string,
    link: string,
    create: string,
    delete: string,
}

interface SurveyResponse {
    status: "OK" | "FAILED",
    data: Survey[]
}

export default async function SurveyRoot() {
    const r = await fetch(CBSHServerURL + "/surveys");
    if (!r.ok) {}

    const res = await r.json() as SurveyResponse;

    return <Card>
        <CardHeader>Surveys</CardHeader>
        <Link href="/prowler/survey" className={ indexStyles.sharePostLink }>Share a survey</Link>
        <ul id="surveys" className={ styles.surveyContainer }>
            { res.data.map((survey) => <li key={survey.id} data-survey-id={survey.id}>
                <Link href={survey.link} target="CBSH_Survey">{survey.name}</Link>
            </li>) }
        </ul>
    </Card>;
};