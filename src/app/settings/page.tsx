import SettingsHeader from "./components/SettingsHeader";
import Personalization from "./sections/personalization";
import ManageSettings from "./sections/manageSettings";
import WidgetManager from "./sections/widgetManager";
import Schedule from "./sections/schedule";


export default function SettingsPage() {
    return <>
        <SettingsHeader>Personalization</SettingsHeader>
        <Personalization />
        <SettingsHeader>Schedule</SettingsHeader>
        <Schedule />
        {/*<SettingsHeader>Widgets</SettingsHeader>
        <WidgetManager />*/}
        <SettingsHeader>Manage Settings</SettingsHeader>
        <ManageSettings />
    </>;
}