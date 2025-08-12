"use client";

import CBSHServerURL from "~/lib/CBSHServerURL";
import { setSession } from "~/lib/session";
import useAlert from "~/AlertContext";
import { useEffect } from "react";

interface SSOIDReq {
    status: "OK" | "FAILED",
    data: {
        uid: string,
        sid: string,
        error: string,
        code: string,
    }
}

export default function LoginTool({ ssoId, appId }: { ssoId: string, appId: string }) {
    const { createAlertBalloon } = useAlert();

    useEffect(() => {
        async function doAction() {
            const session = await signIn(ssoId, appId, createAlertBalloon);
            if (session === "fail") return;
            await setSession(session);
            window.location.href = "/";
        } void doAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};

const signIn = async (ssoId: string, appId: string,
                createAlertBalloon: (title: string, message: string, type?: 0 | 2 | 1 | -1) => void) => {
    const r = await fetch(CBSHServerURL + "/sso/use/" + appId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(ssoId),
        }
    });
    const res = await r.json() as SSOIDReq;

    if (res.status !== "OK") {createAlertBalloon("Something went wrong", res.data.error, 2); return "fail";}
    return { uid: res.data.uid, sid: res.data.sid };
};