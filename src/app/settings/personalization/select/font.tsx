"use client";

import OptionSelect from "~/components/settings/OptionSelect";
import { changeFont } from "~/lib/settingsManager";
import fonts from "~/styles/fonts/fonts";
import { useState } from "react";

export default function FontSelect({ font }: { font: string }) {
    const [fontValue, setFontValue] = useState(font);

    return <OptionSelect value={fontValue} onChange={(e) => {
        changeFont(e); setFontValue(e.currentTarget.value);
    }}>
        <option value="SegoeUI" className={fonts["SegoeUI"]}>Segoe UI (Default)</option>
        <option value="Torus" className={fonts["Torus"]}>Torus Notched</option>
        <option value="Avenir" className={fonts["Avenir"]}>Avenir</option>
        <option value="Aptos" className={fonts["Aptos"]}>Aptos</option>
        <option value="StudySans" className={fonts["StudySans"]}>Study Sans</option>
        <option value="Comic" className={fonts["Comic"]}>Comic Sans</option>
        <option value="DOS" className={fonts["DOS"]}>DOS Terminal</option>
        <option value="Wingdings" className={fonts["Wingdings"]}>Wingdings</option>
    </OptionSelect>;
}