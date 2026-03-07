import OptionDescription from "~/components/settings/OptionDescription";
import ExportButton from "../components/controls/port/ExportButton";
import ImportButton from "../components/controls/port/ImportButton";
import ResetButton from "../components/controls/port/ResetButton";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionGroup from "~/components/settings/OptionGroup";

export default async function ManageSettings() {
    return <SettingsGroup>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="download" />
                <div>
                    <OptionHeader>Export your settings</OptionHeader>
                    <OptionDescription>
                        Export your settings to use on another device or to send to someone else
                    </OptionDescription>
                </div>
                <ExportButton />
            </OptionGroup>
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <SettingsIcon icon="upload" viewBox={24} />
                <div>
                    <OptionHeader>Import your settings</OptionHeader>
                    <OptionDescription>
                        Import your settings from a different device or someone else
                    </OptionDescription>
                </div>
                <ImportButton />
            </OptionGroup>
        </SettingsOption>
        <SettingsOption>
            <OptionGroup>
                <div className="flex justify-between items-center gap-5 w-full">
                    <div className="flex items-center gap-5">
                        <SettingsIcon icon="upload" viewBox={24} />
                        <div>
                            <OptionHeader>Reset your settings</OptionHeader>
                            <OptionDescription>Start fresh with a clean set of settings</OptionDescription>
                        </div>
                    </div>
                    <ResetButton />
                </div>
            </OptionGroup>
        </SettingsOption>
    </SettingsGroup>
};