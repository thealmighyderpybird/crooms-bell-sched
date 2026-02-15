import { useState, type ReactNode } from "react";

export default function Accordion({ title, children }: { title: string, children: ReactNode }) {
    const [showAccordion, setShowAccordion] = useState(false);

    return <div className="group bg-(--sec) mb-0.5 first:rounded-t-2xl last:rounded-b-2xl last:mb-0">
        <div className={"w-full p-3 text-[1rem] leading-none group-first:rounded-t-2xl hover:bg-(--mid-sec) " +
            "active:bg-(--tri) group-[:has(.announcement)]:bg-(--tri)! group-last:rounded-b-2xl " +
            "group-[:not(::first):has(.announcement)]:rounded-none!"}
             onClick={() => setShowAccordion(!showAccordion)}>{ title }</div>
        { showAccordion && <div className="p-3 rounded-2xl announcement">{ children }</div> }
    </div>
}