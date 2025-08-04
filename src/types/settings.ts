export default interface Settings {
    defaultLunch: "A Lunch" | "B Lunch",
    theme: "light" | "dark" | "system",
    showTimeRemainingRing: boolean,
    periodNames: string[],
    accentColor: string,
    clippy: boolean,
    font: string,
}