"use client";

import CroomsBellScheduleApplet from "~/components/CroomsBellScheduleApplet";
import type Settings from "~/types/settings";

export default function FocusMode({ settings }: { settings: Settings }) {
    return <div id="focus" className="fixed inset-0 bg-(--background) px-5 transition-none!">
        <div className="flex flex-col items-center justify-center gap-4 max-w-sm w-full mx-auto h-full">
            <div className="text-center">
                <h1 className="text-(--main)!">Focus Mode</h1>
                <p>Take a breath and focus on your work.</p>
            </div>
            <CroomsBellScheduleApplet id="focus-schedule" settings={settings} />
            <div className="mt-4">
                To exit focus mode, press <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd>.</div>
        </div>
    </div>;
}