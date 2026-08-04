export default interface Settings {
    defaultLunch: 'A Lunch' | 'B Lunch',
    theme: 'light' | 'dark' | 'system',
    showTimeRemainingRing: boolean,
    widgets: WidgetSettings,
    layout: WidgetLayout,
    periodNames: string,
    accentColor: string,
    clippy: boolean,
    font: string,
}

export interface WidgetSettings {
    lunch: boolean,
    weather: boolean,
    news: boolean,
}

export type WidgetLayout = 'sidebar' | 'simplified';