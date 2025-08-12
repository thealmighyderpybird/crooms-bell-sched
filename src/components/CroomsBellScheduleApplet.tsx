"use client";

import { getDateTime, getSchedule, hms2sec, sec2hms, getEventName, type Schedule } from "~/lib/schedule";
import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import ProgressMeter from "~/components/ProgressMeter";
import layout from "./schedule/layout.module.css";
import type Settings from "~/types/settings";
import { useRouter } from "next/navigation";

enum L { A = "A Lunch", B = "B Lunch" }
const currentLunchMap = { [L.A]: 0, [L.B]: 1 };

export default function CroomsBellScheduleApplet({ id, settings }: { id: string, settings: Settings }) {
    const router = useRouter();

    const [currentLunch, setCurrentLunch] = useState(settings.defaultLunch);

    const [currentTime, setCurrentTime] = useState("Please wait...");
    const [period, setPeriod] = useState("Please wait...");

    const [schedule, setSchedule]: [Schedule, Dispatch<SetStateAction<Schedule>>] = useState({
        msg: "Please wait...",
        schedule: [[[0, 0, 0, 23, 59]], [[0, 0, 0, 23, 59]]],
        error: "", code: ""
    });

    const [periodClassName, setPeriodClassName] = useState("");
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        setCurrentTime(getDateTime());
        setTimeout(() => {
            setInterval(() => setCurrentTime(getDateTime()), 1000);
        }, new Date().getMilliseconds());
        async function fetchSchedule() { setSchedule(await getSchedule()); }
        void fetchSchedule();
    }, []);

    useEffect(() => {
        if (!schedule?.schedule) return;

        function mainLoop() {
            const currentDay = schedule.schedule[currentLunchMap[currentLunch]]!;
            const now = new Date();
            const nowSec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());

            // Find the first event that hasn't ended yet
            let index = currentDay.length - 1; // default to last event
            for (let i = 0; i < currentDay.length; i++) {
                const endSec = hms2sec(currentDay[i]![3]!, currentDay[i]![4]!, 0);
                if (nowSec < endSec) {
                    index = i;
                    break;
                }
            }

            const newEvent = currentDay[index]!;
            setPeriod(
                getPeriodAndTimeRemaining(
                    schedule,
                    settings,
                    currentLunch,
                    newEvent,
                    setPeriodClassName,
                    setProgress
                )
            );
        }

        // Run immediately so there's no "loading" delay
        mainLoop();

        const interval = setInterval(mainLoop, 1000);
        return () => clearInterval(interval);
    }, [schedule, currentLunch, settings]);

    const isActive = (selectedLunch: string) => {
        return selectedLunch === currentLunch ? ` ${layout.active}` : "";
    };

    return <div id={"cbsh-application-" + id} className={layout.croomsBellScheduleApplication}>
        <div className={layout.mainContentContainer}>
            <div>
                <p className={layout.content}>{currentTime}</p>
                <p className={layout.content}>{schedule.msg}</p>
                <p className={`${layout.content} ${periodClassName}`}>{period}</p>
            </div>
            <div>
                <button className={layout.button + isActive("A Lunch")} title="Switch to A Lunch" onClick={() => {
                            setCurrentLunch("A Lunch");
                        }}>A Lunch</button>
                <button className={layout.button + isActive("B Lunch")} title="Switch to B Lunch" onClick={() => {
                            setCurrentLunch("B Lunch");
                        }}>B Lunch</button>
                <button className={layout.button} title="Change your settings"
                        onClick={() => router.push("/settings")}>Settings</button>
            </div>
        </div>
        { settings.showTimeRemainingRing ? <ProgressMeter progress={progress} /> : null }
    </div>;
};

const getPeriodAndTimeRemaining = (
    schedule: Schedule, settings: Settings, currentLunch: "A Lunch" | "B Lunch", currentEvent: number[],
    setCurrentPeriodClass: (className: string) => void, setProgress: (progress: number) => void,
) => {
    const now = new Date();

    const startHour = currentEvent !== undefined ? currentEvent[0]! : 0;
    const startMinute = currentEvent !== undefined ? currentEvent[1]! : 0;
    const endHour = currentEvent !== undefined ? currentEvent[3]! : 23;
    const endMinute = currentEvent !== undefined ? currentEvent[4]! : 59;

    const EventName = currentEvent !== undefined ? getEventName(currentEvent[2], settings) : "Unknown Event";

    const endEventSec = hms2sec(endHour, endMinute, 0);
    const startEventSec = hms2sec(startHour, startMinute, 0);
    const nowSec = hms2sec(now.getHours(), now.getMinutes(), now.getSeconds());
    const countdown = sec2hms(endEventSec - nowSec);

    if (endEventSec - nowSec <= 600) {
        setCurrentPeriodClass(endEventSec - nowSec <= 60 ? layout.lessThan1! : layout.lessThan10!);
    } else setCurrentPeriodClass("");

    const percentRemaining = ((endEventSec - nowSec) / (endEventSec - startEventSec)) * 100;
    const percentComplete = 100 - percentRemaining;
    setProgress(percentComplete);

    return EventName + ", Time Left: " + countdown.toString();
};