import OptionDescription from "~/components/settings/OptionDescription";
import ColorSchemeOptions from "../components/controls/colorScheme";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionGroup from "~/components/settings/OptionGroup";
import ThemeOptions from "../components/theme/ThemeOptions";
import FontOption from "../components/controls/font";
import getSiteSettings from "~/lib/getSettings";

export default async function Personalization() {
    const { font, theme } = await getSiteSettings();

    return <SettingsGroup>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="paint" />
                <div>
                    <OptionHeader>Choose your mode</OptionHeader>
                    <OptionDescription>Change the colors that appear in the Crooms Bell Schedule</OptionDescription>
                </div>
                <ColorSchemeOptions theme={theme} />
            </OptionGroup>
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="theme" />
                <div>
                    <OptionHeader>Theme</OptionHeader>
                    <OptionDescription>
                        Choose a combination of backgrounds and colors to give the Crooms Bell Schedule more personality
                    </OptionDescription>
                </div>
            </OptionGroup>
            <ThemeOptions />
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="text" viewBox={32} />
                <div>
                    <OptionHeader>Font</OptionHeader>
                    <OptionDescription>Change the font that the Crooms Bell Schedule uses</OptionDescription>
                </div>
                <FontOption font={font} />
            </OptionGroup>
        </SettingsOption>
    </SettingsGroup>
};