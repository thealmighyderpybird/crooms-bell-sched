import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import WeatherWidget from "../components/cards/WeatherWidget";
import SocialWidget from "~/components/cards/SocialWidget";
import LunchWidget from "../components/cards/LunchWidget";
import CardLayout from "../components/index/CardLayout";
import ThemeProvider from "~/components/ThemeProvider";
import getSessionInfo from "~/lib/getSessionInfo";
import getSiteSettings from "~/lib/getSettings";
import getSession from "~/lib/session.server";
import Card from "../components/index/Card";
import AdFrame from "~/components/AdFrame";
import RandExp from "randexp";
import "~/styles/index.css";

export default async function Home() {
    const userDetails = await getSessionInfo((await getSession()).sid);
    const siteSettings = await getSiteSettings();

    return <ThemeProvider>
        <CardLayout>
            <Card>
                <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()} settings={siteSettings} />
                { !userDetails.croomsPro && <AdFrame style={{ marginBlockStart: "1rem" }} /> }
            </Card>
            { siteSettings.widgets.lunch && <LunchWidget /> }
            { siteSettings.widgets.weather && <WeatherWidget /> }
            <SocialWidget widgetSettings={siteSettings.widgets} />
        </CardLayout>
    </ThemeProvider>;
};