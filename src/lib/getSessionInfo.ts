import CBSHServerURL from "~/lib/CBSHServerURL";

interface CBSHUserAPIResponse {
    status: "OK" | "FAILED",
    data: CBSHUser & { error: string, code: string }
}

export interface CBSHUser {
    id: string,
    username: string,
    displayName: string,
    isAdmin: boolean,
}

const getSessionInfo = async (sid: string) => {
    const r = await fetch(CBSHServerURL + "/users/userDetails", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": JSON.stringify(sid)
        },
    });
    const res = await r.json() as CBSHUserAPIResponse;
    return res.data;
};

export default getSessionInfo;