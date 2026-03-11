import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import WeatherWidget from "~/components/cards/WeatherWidget";
import CardLayout from "~/components/index/IndexCardLayout";
import ProwlerCard from "~/components/cards/ProwlerCard";
import LunchWidget from "~/components/cards/LunchWidget";
import ThemeProvider from "~/components/ThemeProvider";
import getSessionInfo from "~/lib/getSessionInfo";
import getSiteSettings from "~/lib/getSettings";
import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import Card from "../components/index/Card";
import AdFrame from "~/components/AdFrame";
import Surveys from "~/prowler/surveyRoot";
import { userAgent } from "next/server";
import { headers } from "next/headers";
import RandExp from "randexp";
import "~/styles/index.css";

export default async function Home() {
    const { uid, sid } = await getSession();
    const userDetails = await getSessionInfo(sid);
    const siteSettings = await getSiteSettings();
    const { device } = userAgent({ headers: await headers() });
    const deviceType = device.type ?? "Unknown";

    const canIPostRes = await (await fetch(CBSHServerURL + "/prowler/can-i-post", {
        headers: { "Authorization": JSON.stringify(sid) }, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean | "pending" };

    return <ThemeProvider>
        <div className="flex flex-col lg:flex-row w-fit mx-auto px-2 lg:px-4 py-7 lg:py-0">
            <CardLayout>
                <Card>
                    <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()} settings={siteSettings} />
                    { !userDetails.croomsPro && <AdFrame style={{ marginBlockStart: "1rem" }} /> }
                </Card>
                { siteSettings.widgets.lunch && <LunchWidget /> }
                { siteSettings.widgets.weather && <WeatherWidget /> }
                { siteSettings.widgets.surveys && <Surveys />}
                { (siteSettings.layout === "simplified" && siteSettings.widgets.prowler) &&
                    <ProwlerCard sid={sid} uid={uid} userDetails={userDetails} canIPost={canIPostRes.data}
                                 deviceType="mobile" /> }
            </CardLayout>
            { (siteSettings.layout === "sidebar" && siteSettings.widgets.prowler) && <div className="sticky top-13 h-fit">
                <CardLayout>
                    <ProwlerCard sid={sid} uid={uid} userDetails={userDetails} canIPost={canIPostRes.data}
                                 deviceType={deviceType} />
                </CardLayout>
            </div>}
        </div>
    </ThemeProvider>;
};