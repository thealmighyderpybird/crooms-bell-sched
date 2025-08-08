import Personalization from "./sections/personalization";
import SettingsHeader from "./components/SettingsHeader";


export default function SettingsPage() {
    return <>
        <SettingsHeader>Personalization</SettingsHeader>
        <Personalization />
    </>;
}