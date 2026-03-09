import type { ReactNode } from "react";

export default function SettingsHeader({ children }: { children: ReactNode }) {
    return <h2 className="mt-4! select-none font-normal!" id={String(children).toLowerCase().split(" ")[0]}>{ children }</h2>
};