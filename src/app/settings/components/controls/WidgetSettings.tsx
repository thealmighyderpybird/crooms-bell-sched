"use client";

import type { WidgetSettings } from "~/types/settings";
import ReactSwitch from "react-switch";
import { useState } from "react";

export default function WidgetSettings({ settings }: { settings: WidgetSettings }) {
    const [widgetSettings, setWidgetSettings] = useState(settings);

    return <div style={{ marginBlockStart: "1.5rem" }}>
        {JSON.stringify(widgetSettings)}
    </div>;
};