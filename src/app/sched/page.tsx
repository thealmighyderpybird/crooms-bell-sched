import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import getSiteSettings from "~/lib/getSettings";
import "./app.css";

export default async function Page() {
    return <CroomsBellScheduleApplet id="embed" settings={await getSiteSettings()} />
}