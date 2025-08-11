import type { ReactNode } from "react";

export default function SettingsHeader({ children }: { children: ReactNode }) {
    return <h2 style={{ marginBlockStart: "1rem", userSelect: "none", fontWeight: "inherit" }}>{ children }</h2>
};