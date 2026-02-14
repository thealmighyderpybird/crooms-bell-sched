import type { ReactNode } from "react";

export default function CardLayout({ children }: { children: ReactNode }) {
    return <div className="w-full max-w-137.5 mx-auto py-8 px-4 flex flex-col flex-nowrap gap-2">{ children }</div>;
};