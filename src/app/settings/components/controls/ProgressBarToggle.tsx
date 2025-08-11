"use client";

import OptionSlider from "~/components/settings/OptionSlider";
import { setProgressBar } from "~/lib/settingsManager";
import { useState } from "react";

export default function ProgressBarToggle({ initial }: { initial: boolean }) {
    const [enabled, setEnabled] = useState(initial);
    
    return <OptionSlider checked={enabled} onChange={(value) => {
        setProgressBar(value);
        setEnabled(value);
    }} />
};