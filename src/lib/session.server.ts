import CBSHServerURL from "~/lib/CBSHServerURL";
import { cookies } from "next/headers";

const getSession = async (): Promise<{ uid: string, sid: string }> => {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")?.value ?? "";
    const sid = cookieStore.get("sid")?.value ?? "";

    if (uid === "" || sid === "") return { uid: "", sid: "" };
    return await verifySession(uid, sid);
};

export const verifySession = async (uid: string, sid: string) => {
    try {
        const r = await fetch(CBSHServerURL + "/users/validateSID/" + uid, {
            method: "POST",
            headers: {
                "Authorization": JSON.stringify(sid),
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        });
        const res = await r.json() as {
            status: "OK" | "FAILED",
            data: { error: string, code: string, result: boolean }
        };

        if (!res.data.result) {
            await serverSignOut();
            return {uid: "", sid: ""};
        }
        return res.data.result ? {uid: uid, sid: sid} : {uid: "", sid: ""};
    } catch {
        return { uid, sid };
    }
};

export const serverSignOut = async () => {
    const cookieStore = await cookies();
    cookieStore.delete("uid");
    cookieStore.delete("sid");
};

export default getSession;