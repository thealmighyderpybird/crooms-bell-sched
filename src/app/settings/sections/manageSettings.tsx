import OptionDescription from "~/components/settings/OptionDescription";
import ExportButton from "../components/controls/port/ExportButton";
import ImportButton from "../components/controls/port/ImportButton";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionGroup from "~/components/settings/OptionGroup";

export default async function Personalization() {
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
                <SettingsIcon icon="upload" viewBox={24} />
                <div>
                    <OptionHeader>
                        <strong style={{ color: "var(--default-accent)" }}>Reset your settings</strong>
                    </OptionHeader>
                    <OptionDescription>
                        Start fresh with a clean set of settings. You will need to set them up again
                    </OptionDescription>
                </div>
                <button style={{ minWidth: "8rem" }}>Reset Settings</button>
            </OptionGroup>
        </SettingsOption>
    </SettingsGroup>
};