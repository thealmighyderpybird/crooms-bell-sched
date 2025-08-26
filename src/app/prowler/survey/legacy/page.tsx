import CBSHServerURL from "~/lib/CBSHServerURL";

export default function LegacySurveyPage() {
    return <iframe src={CBSHServerURL + "/survey"} style={{ position: "fixed", inset: "51px 0 31px", height: "calc(100% - 51px - 31px)" }} />
}