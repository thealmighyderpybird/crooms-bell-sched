import OptionDescription from "~/components/settings/OptionDescription";
import WidgetSettings from "../components/controls/WidgetSettings";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionHeader from "~/components/settings/OptionHeader";
import OptionGroup from "~/components/settings/OptionGroup";
import getSiteSettings from "~/lib/getSettings";

export default async function WidgetManager() {
    const { widgets } = await getSiteSettings();

    return <SettingsGroup>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="widgets" />
                <div>
                    <OptionHeader>Manage Widgets</OptionHeader>
                    <OptionDescription>Toggle the visibility of certain widgets on the dashboard.</OptionDescription>
                </div>
            </OptionGroup>
            <WidgetSettings settings={widgets} />
        </SettingsOption>
    </SettingsGroup>;
}