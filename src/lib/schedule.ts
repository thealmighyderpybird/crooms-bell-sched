import { weekday, parseTime } from "./parseEndTime";
import CBSHServerURL from "~/lib/CBSHServerURL";
import type Settings from "~/types/settings";

export interface Schedule {
    msg: string,
    schedule: number[][][],

    // for errors
    error: string,
    code: string,
}

interface ScheduleRequest {
    status: "OK" | "FAILED",
    data: Schedule
}


export const getDateTime = () => {
    const dateObj = new Date();
    const day = weekday[dateObj.getDay()];
    const month = dateObj.getMonth() + 1;
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${day} ${month}/${date}/${year} ${parseTime(dateObj)}`
};

export const getSchedule = async () => {
    const r = await fetch(CBSHServerURL + "/today");
    const res = await r.json() as ScheduleRequest;

    if (res.status !== "OK") return { error: "An error occurred. " + res.data.error } as Schedule;
    return res.data;
};

export const hms2sec = (hours: number, minutes: number, seconds: number) =>
    (hours * 3600) + (minutes * 60) + seconds;

export const sec2hms = (sec: number) => {
    let remaining = sec;
    let hms;
    const hours = Math.floor(sec / 3600);
    remaining -= hours * 3600;
    const minutes = Math.floor(remaining / 60);
    remaining -= minutes * 60;
    const seconds = remaining;

    if (sec < 3600) hms = "";
    else hms = hours.toString() + ":";

    if (minutes >= 10) hms += minutes.toString();
    else if (sec >= 3600 && minutes <= 10) hms += "0" + minutes.toString();
    else hms += minutes.toString();

    if (seconds >= 10) hms += ":" + seconds.toString();
    else hms += ":0" + seconds.toString();

    return hms;
};

export const getEventName = (EventName: number | undefined, settings: Settings) => {
    let eventName;
    if (EventName === 1 || EventName === 2 || EventName === 3 || EventName === 4 || EventName === 5
        || EventName === 6 || EventName === 7 || EventName === 8) eventName = settings.periodNames[EventName];

    else if (EventName === 0) eventName = "Nothing";
    else if (EventName === 100) eventName = "Morning";
    else if (EventName === 101) eventName = "Welcome";
    else if (EventName === 102) eventName = "Lunch";
    else if (EventName === 103) eventName = "Homeroom";
    else if (EventName === 104) eventName = "Dismissal";
    else if (EventName === 105) eventName = "After School";
    else if (EventName === 106) eventName = "End";
    else if (EventName === 107) eventName = "Break";
    else if (EventName === 110) eventName = "PSAT/SAT";
    else if (EventName === 111) eventName = "Session 1";
    else if (EventName === 112) eventName = "Session 2";
    else if (EventName === 113) eventName = "Session 3";
    else if (EventName === 114) eventName = "Session 5";
    else if (EventName === 115) eventName = "Field Day";
    else if (EventName === 116) eventName = "Testing";
    else eventName = "Unknown Event";

    if (EventName === undefined) eventName = "Unknown Event";

    return eventName;
};