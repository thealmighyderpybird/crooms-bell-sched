import type { ReactNode } from "react";

export default function SettingsGrid({ children }: { children: ReactNode }) {
    return <div className="flex flex-wrap gap-1 mt-6">{ children }</div>;
};