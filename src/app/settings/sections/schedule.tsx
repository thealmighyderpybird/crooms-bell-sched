import ProgressBarToggle from "../components/controls/ProgressBarToggle";
import PeriodNameChanger from "../components/controls/PeriodNameChanger";
import OptionDescription from "~/components/settings/OptionDescription";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import DefaultLunch from "../components/controls/defaultLunch";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionGroup from "~/components/settings/OptionGroup";
import getSiteSettings from "~/lib/getSettings";

export default async function Schedule() {
    const { periodNames, defaultLunch, showTimeRemainingRing } = await getSiteSettings();

    return <SettingsGroup>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="name" />
                <div>
                    <OptionHeader>Classes</OptionHeader>
                    <OptionDescription>
                        Change the names that are used for each period on the Crooms Bell Schedule
                    </OptionDescription>
                </div>
            </OptionGroup>
            <PeriodNameChanger initial={periodNames} />
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="dine" />
                <div>
                    <OptionHeader>Default Lunch</OptionHeader>
                    <OptionDescription>
                        Select your default lunch to allow the Crooms Bell Schedule to display proper transition times
                        during the lunch period
                    </OptionDescription>
                </div>
                <DefaultLunch lunch={defaultLunch} />
            </OptionGroup>
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="bar" viewBox={24} />
                <div>
                    <OptionHeader>Progress Bar</OptionHeader>
                    <OptionDescription>
                        Enable or disable the progress bar at the bottom of the schedule applet
                    </OptionDescription>
                </div>
                <ProgressBarToggle initial={showTimeRemainingRing} />
            </OptionGroup>
        </SettingsOption>
    </SettingsGroup>
};