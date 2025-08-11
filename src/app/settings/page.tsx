import SettingsHeader from "./components/SettingsHeader";
import Personalization from "./sections/personalization";
import ManageSettings from "./sections/manageSettings";
import Schedule from "./sections/schedule";


export default function SettingsPage() {
    return <>
        <SettingsHeader>Personalization</SettingsHeader>
        <Personalization />
        <SettingsHeader>Schedule</SettingsHeader>
        <Schedule />
        <SettingsHeader>Manage Settings</SettingsHeader>
        <ManageSettings />
    </>;
}