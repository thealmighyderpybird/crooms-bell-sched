"use client";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import styles from "~/prowler/surveys.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import { useRouter } from "next/navigation";
import useAlert from "~/AlertContext";
import { useState } from "react";

export default function SurveyTool({ sid }: { sid: string }) {
    const [surveyName, setSurveyName] = useState("");
    const [surveyLink, setSurveyLink] = useState("");
    const router = useRouter();
    const { createAlertBalloon } = useAlert();

    return <>
        <div>
            <input value={surveyName} onChange={(e) => setSurveyName(e.target.value)}
                   placeholder="Survey Name" name="name" id="survey-name" className={ styles.input } autoCapitalize="off"
                   autoComplete="off" autoCorrect="off" /><br />
            <input value={surveyLink} onChange={(e) => setSurveyLink(e.target.value)}
                   placeholder="Survey Link" name="link" id="survey-link" className={ styles.input } autoCapitalize="off"
                   autoComplete="off" autoCorrect="off" /><br />
        </div>
        <div className={ styles.actionBar }>
            <button onClick={() => checkSurvey(surveyName, surveyLink, sid, createAlertBalloon, router)}
                    title="Post your survey">Post Survey</button>
        </div>
    </>;
};

const checkSurvey = async (name: string, link: string, sid: string,
                           newAlert: (title: string, message: string, severity: -1|0|1|2) => void,
                           router: AppRouterInstance) => {
    if (!name) {
        newAlert("Failed to post", "Please enter a survey name.", 1);
        return;
    }

    const regex = /^(?:(?:https?|ftp):)?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    if (!regex.test(link)) {
        newAlert("Failed to post", "Please enter a valid link to your survey.", 1);
        return;
    }

    const r = await fetch(CBSHServerURL + "/surveys", {
        method: "POST",
        headers: {
            "Authorization": JSON.stringify(sid),
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            name: name,
            link: link,
        }),
    });
    const res = await r.json() as { status: "OK" | "FAILED", data: { error: string, code: string } };

    if (res.status !== "OK") {
        newAlert("Failed to post", res.data.error, 2);
        return;
    }

    else router.push("/");
};