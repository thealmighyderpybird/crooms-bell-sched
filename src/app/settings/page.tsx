import OptionDescription from "~/components/settings/OptionDescription";
import SettingsGroup from "~/components/settings/SettingsGroup";
import SettingsLink from "~/components/settings/SettingsLink";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionGroup from "~/components/settings/OptionGroup";

export default function SettingsPage() {
    return <SettingsGroup>
        <SettingsLink href="/settings/personalization">
            <OptionGroup>
                <SettingsIcon icon="theme" />
                <div>
                    <OptionHeader>Personalization</OptionHeader>
                    <OptionDescription>
                        Give the Crooms Bell Schedule a personality like yours
                    </OptionDescription>
                </div>
            </OptionGroup>
        </SettingsLink>
    </SettingsGroup>;
}