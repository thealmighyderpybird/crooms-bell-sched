"use client";

import { changeColorMode } from "~/lib/settingsManager";
import OptionDescription from "~/components/settings/OptionDescription";
import SettingsOption from "~/components/settings/SettingsOption";
import SettingsGroup from "~/components/settings/SettingsGroup";
import OptionHeader from "~/components/settings/OptionHeader";
import SettingsIcon from "~/components/settings/SettingsIcon";
import OptionSelect from "~/components/settings/OptionSelect";
import OptionGroup from "~/components/settings/OptionGroup";
import styles from "../settings.module.css";
import ThemeOptions from "./ThemeOptions";
import Link from "next/link";

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
        <div className={styles.actionBar}>
            <Link href="/settings" className={styles.button + " button"}>Back</Link>
            <button className={styles.button}>Save</button>
        </div>
    </SettingsGroup>
}