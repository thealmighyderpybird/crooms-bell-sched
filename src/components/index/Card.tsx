import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
    return <div className="bg-(--pri) rounded-2xl p-4">{ children }</div>;
};