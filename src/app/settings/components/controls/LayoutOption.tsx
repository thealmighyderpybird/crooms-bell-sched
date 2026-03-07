"use client";

import type { MouseEventHandler, ReactNode } from "react";

const activeClass = " bg-(--accent-color)/20! text-(--accent-color)"

export default function LayoutOption({ children, title, description, selected, onClickAction }: {
    children: ReactNode, title: string, description: string, selected: boolean, onClickAction: MouseEventHandler<HTMLDivElement>
}) {
    return <div className={"bg-(--sec) w-52 p-5 rounded-xl flex flex-col items-center gap-2.5" + (selected ? activeClass : "")}
                onClick={onClickAction}>
        { children }
        <div className="text-center leading-none select-none">
            <span className="text-inherit font-normal! block leading-none">{ title }</span>
            <span className="text-xs block leading-none">{ description }</span>
        </div>
    </div>;
}