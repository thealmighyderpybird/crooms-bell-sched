import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import WeatherWidget from "../components/cards/WeatherWidget";
import SocialWidget from "~/components/cards/SocialWidget";
import LunchWidget from "../components/cards/LunchWidget";
import CardLayout from "../components/index/CardLayout";
import ThemeProvider from "~/components/ThemeProvider";
import getSiteSettings from "~/lib/getSettings";
import Card from "../components/index/Card";
import AdFrame from "~/components/AdFrame";
import RandExp from "randexp";
import "~/styles/index.css";

export default async function Home() {
    const { widgets } = await getSiteSettings();

    return <ThemeProvider>
        <CardLayout>
            <Card>
                <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()}
                                          settings={await getSiteSettings()} />
                <AdFrame style={{ marginBlockStart: "1rem" }} />
            </Card>
            { widgets.lunch && <LunchWidget /> }
            { widgets.weather && <WeatherWidget /> }
            <SocialWidget widgetSettings={widgets} />
        </CardLayout>
    </ThemeProvider>;
};