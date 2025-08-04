const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const parseEndTime = (endTime: Date, expireTime: Date) => {
    if (endTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)" &&
        expireTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
        return "further notice"
    } else if (endTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
        return parseWxTime(expireTime);
    } else return parseWxTime(endTime);
};

const parseWxTime = (endTime: Date) => {
    let endDay: number | string = endTime.getDay();
    if (endDay === new Date().getDay()) {
        endDay = " "
    } else {
        endDay = weekday[endDay] + " at "
    }

    return endDay + parseTime(endTime);
};

const parseTime = (time: Date) => {
    let apm;
    let endHour = time.getHours();
    if (endHour > 12) {
        endHour -= 12;
        apm = "PM"
    } else if (endHour === 12) apm = "PM";
    else if (endHour === 0) {
        endHour = 12;
        apm = "AM"
    } else apm = "AM";

    let endMinute: number | string = time.getMinutes();
    if (endMinute < 10) endMinute = "0" + endMinute

    return endHour + ":" + endMinute + " " + apm;
};

export default parseEndTime;