import type { ReactNode } from "react";

export default function CardHeader({ children }: { children: ReactNode }) {
    return <h3 className="select-none leading-none">{ children }</h3>;
};