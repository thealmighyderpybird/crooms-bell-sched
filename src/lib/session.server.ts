import { cookies } from "next/headers";

const getSession = async (): Promise<{ uid: string, sid: string }> => {
    const cookieStore = await cookies();
    const uid = cookieStore.get("uid")!.value;
    const sid = cookieStore.get("sid")!.value;

    return { uid, sid };
};

export default getSession;