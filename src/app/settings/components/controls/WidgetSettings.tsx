"use client";

import OptionSlider from "~/components/settings/OptionSlider";
import { updateWidgetSettings } from "~/lib/settingsManager";
import type { WidgetSettings } from "~/types/settings";
import { useState } from "react";

export default function WidgetSettings({ settings }: { settings: WidgetSettings }) {
    const [weatherWidget, setWeatherWidget] = useState(settings.weather);
    const [prowlerWidget, setProwlerWidget] = useState(settings.prowler);
    const [surveyWidget, setSurveyWidget] = useState(settings.surveys);
    const [lunchWidget, setLunchWidget] = useState(settings.lunch);
    const [widgetSettings, setWidgetSettings] = useState(settings);

    return <div className="mt-6 flex flex-col gap-1">
        <div className="flex justify-between items-center bg-(--sec) p-2 rounded-lg">
            <span className="leading-none">Lunch</span>
            <OptionSlider checked={lunchWidget} onChange={value => {setLunchWidget(value);
                widgetSettings.lunch = value; setWidgetSettings(widgetSettings); updateWidgetSettings(widgetSettings)}} />
        </div>
        <div className="flex justify-between items-center bg-(--sec) p-2 rounded-lg">
            <span className="leading-none">Weather</span>
            <OptionSlider checked={weatherWidget} onChange={value => {setWeatherWidget(value);
                widgetSettings.weather = value; setWidgetSettings(widgetSettings); updateWidgetSettings(widgetSettings)}} />
        </div>
        <div className="flex justify-between items-center bg-(--sec) p-2 rounded-lg">
            <span className="leading-none">Surveys</span>
            <OptionSlider checked={surveyWidget} onChange={value => {setSurveyWidget(value);
                widgetSettings.surveys = value; setWidgetSettings(widgetSettings); updateWidgetSettings(widgetSettings)}} />
        </div>
        <div className="flex justify-between items-center bg-(--sec) p-2 rounded-lg">
            <span className="leading-none">Prowler</span>
            <OptionSlider checked={prowlerWidget} onChange={value => {setProwlerWidget(value);
                widgetSettings.prowler = value; setWidgetSettings(widgetSettings); updateWidgetSettings(widgetSettings)}} />
        </div>
    </div>;
};