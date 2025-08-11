"use client";

import OptionSelect from "~/components/settings/OptionSelect";
import { changeColorMode } from "~/lib/settingsManager";
import { useState } from "react";

export default function ColorScheme({ theme }: { theme: string }) {
    const [colorScheme, setColorScheme] = useState(theme);

    return <OptionSelect value={colorScheme} onChange={(e) => {
        changeColorMode(e);
        setColorScheme(e.currentTarget.value)
    }}>
        <option value="system">System Theme</option>
        <option value="light">Light Theme</option>
        <option value="dark">Dark Theme</option>
    </OptionSelect>;
};