import Card from "~/components/index/Card";
import Spinner from "~/components/Spinner";
import LoginTool from "./LoginTool";

export default async function AuthCallback({ searchParams }: { searchParams: Promise<{ ssoId: string }> }) {
    const { ssoId } = await searchParams;

    return <Card>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0.5rem" }}>
            <Spinner size={100} />
            <h2>Please wait...</h2>
            <p style={{ marginBlockEnd: "0" }}>Logging you in...</p>
            <LoginTool ssoId={ssoId} appId="crooms-bell-schedule" />
        </div>
    </Card>
}