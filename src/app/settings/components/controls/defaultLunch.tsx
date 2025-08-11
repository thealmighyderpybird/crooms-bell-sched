"use client";

import OptionSelect from "~/components/settings/OptionSelect";
import { changeDefaultLunch } from "~/lib/settingsManager";
import { useState } from "react";

export default function DefaultLunch({ lunch }: { lunch: "A Lunch" | "B Lunch" | undefined }) {
    const [defaultLunch, setDefaultLunch] = useState(lunch);

    return <OptionSelect value={defaultLunch} onChange={(e) => {
        // @ts-expect-error undefined will be ignored
        setDefaultLunch(e.currentTarget.value);
        changeDefaultLunch(e);
    }}>
        <option value="A Lunch">A Lunch</option>
        <option value="B Lunch">B Lunch</option>
    </OptionSelect>;
};