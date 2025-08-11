import getSession from "~/lib/session.server";
import Card from "~/components/index/Card";
import Spinner from "~/components/Spinner";
import { redirect } from "next/navigation";

export default async function AuthLogin() {
    const session = await getSession();
    if (session.uid !== "" && session.sid !== "") redirect("/")

    return <Card>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
            <Spinner size={100} />
            <h2>Please wait...</h2>
            <p style={{ marginBlockEnd: "0" }}>Logging you in...</p>
            { redirect("https://account.croomssched.tech/auth/login/sso/crooms-bell-schedule") }
        </div>
    </Card>
}