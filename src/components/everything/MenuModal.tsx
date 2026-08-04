"use client";

import EverythingSearch from "~/everything-search/index";
import { useState } from "react";

export default function MenuModal({ setActiveAction }: { setActiveAction: (value: boolean) => void }) {
    const focusedBackground = { background: "var(--pri) !important" };
    const [selectedQuery, setSelectedQuery] = useState(0);
    const [focused, setFocused] = useState(false);
    const [query, setQuery] = useState("");

    // @ts-ignore
    const handleKeyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") setActiveAction(false);
    }

    const search = new EverythingSearch(true);

    return <div className="fixed z-100 max-w-lg w-full">
        <div className="bg-(--pri)/80 fixed inset-0 z-100" onClick={() => setActiveAction(false)} />
        <div className="bg-(--background) rounded-2xl relative z-101 box-glow-[black]">
            <label className="hidden" htmlFor="everything-search">Search for everything...</label>
            <input className={`p-5 rounded-t-2xl ${query ? "" : "rounded-b-2xl "}w-full text-left border border-(--sec)`}
                   onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                   onChange={e => setQuery(e.currentTarget.value)} value={query}
                   placeholder="Search for everything..." style={focused ? focusedBackground : undefined}
                   autoFocus spellCheck="false" id="everything-search" name="everything-search" autoComplete="off"
                   onKeyDown={e => handleKeyEvent(e)} />
            { query && <div className="rounded-b-2xl border border-(--sec) border-t-0">{ query ?? "" }</div> }
        </div>
    </div>;
};