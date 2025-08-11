import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import WeatherWidget from "../components/cards/WeatherWidget";
import ProwlerWidget from "~/components/cards/ProwlerWidget";
import LunchWidget from "../components/cards/LunchWidget";
import CardLayout from "../components/index/CardLayout";
import ThemeProvider from "~/components/ThemeProvider";
import getSiteSettings from "~/lib/getSettings";
import Card from "../components/index/Card";
import RandExp from "randexp";
import "~/styles/index.css";

export default async function Home() {
    return <ThemeProvider>
        <CardLayout>
            <Card>
                <CroomsBellScheduleApplet id={new RandExp(/[a-f0-9]\w{10}/).gen()}
                                          settings={await getSiteSettings()} />
            </Card>
            <LunchWidget />
            <WeatherWidget />
            <ProwlerWidget />
        </CardLayout>
    </ThemeProvider>;
};