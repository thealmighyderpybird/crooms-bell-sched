"use client";

import { changeColorMode } from "~/lib/settingsManager";
import OptionDescription from "~/components/settings/OptionDescription";
import ThemeOptions from "~/app/settings/personalization/ThemeOptions";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionSelect from "~/components/settings/OptionSelect";
import OptionGroup from "~/components/settings/OptionGroup";

export default function Personalization() {
    return <SettingsGroup>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="paint" />
                <div>
                    <OptionHeader>Choose your mode</OptionHeader>
                    <OptionDescription>Change the colors that appear in the Crooms Bell Schedule</OptionDescription>
                </div>
                <OptionSelect onChange={e => changeColorMode(e)}>
                    <option value="">System Theme</option>
                    <option value="light">Light Theme</option>
                    <option value="dark">Dark Theme</option>
                </OptionSelect>
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
    </SettingsGroup>
}