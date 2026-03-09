import type { ReactNode } from "react";

export default function IndexCardLayout({ children }: { children: ReactNode }) {
    return <div className="w-full lg:w-137.5 max-w-137.5 mx-auto py-1 lg:py-4 px-2 flex flex-col flex-nowrap gap-2">{ children }</div>;
};