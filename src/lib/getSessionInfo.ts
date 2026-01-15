import CBSHServerURL from "~/lib/CBSHServerURL";

interface CBSHUserAPIResponse {
    status: "OK" | "FAILED",
    data: CBSHUser
}

export interface CBSHUser {
    error: string,
    code: string,
    id: string,
    username: string,
    displayname: string,
    verified: boolean,
    userTags: string[],
    croomsPro: boolean,
    role: "user" | "mod" | "dev" | "admin",
    providers: [],
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