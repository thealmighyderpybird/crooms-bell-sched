function getInfo() {
    let info = new XMLHttpRequest();
    info.open('GET', 'https://croomssched.glitch.me/infoFetch.json');
    info.responseType = 'json';
    info.send();
    info.onload = () => {
        setInfo(JSON.parse(JSON.stringify(info.response)));
    }

    let fun = new XMLHttpRequest();
    fun.open('GET', 'https://g-chrome-dino.glitch.me/cbsh.json');
    fun.responseType = 'json';
    fun.send();
    fun.onload = () => {
        setFun(JSON.parse(JSON.stringify(fun.response)));
    }
}

function setInfo(information) {
    document.getElementById("MondayLunchItem").innerHTML = information.lunch[1].name;
    document.getElementById("TuesdayLunchItem").innerHTML = information.lunch[2].name;
    document.getElementById("WednesdayLunchItem").innerHTML = information.lunch[3].name;
    document.getElementById("ThursdayLunchItem").innerHTML = information.lunch[4].name;
    document.getElementById("FridayLunchItem").innerHTML = information.lunch[5].name;
    document.getElementById("AllLunchItem").innerHTML = information.lunch[6];
    const dates = new Date;
    let day = dates.getDay();
    if (0 < day && day < 6) loadBlobImg(information.lunch[day].image, document.getElementById("DailyLunchImage"));
    document.querySelector("#quickbits > div > ol").innerHTML = "";
    information.quickBits.forEach((quickBit) => {
        let bitQuick = document.createElement("li");
        bitQuick.innerHTML = quickBit;
        document.querySelector("#quickbits > div > ol").appendChild(bitQuick);
    });
}

function setFun(information) {
    document.getElementById("senseless").innerHTML = information.senseless;
    document.getElementById("quote").innerHTML = information.teacherquote.quote;
    document.getElementById("teacher").innerHTML = information.teacherquote.teacher;
}

const getForecast = () => {
    let foc = new XMLHttpRequest();
    foc.open('GET', 'https://api.weather.gov/gridpoints/MLB/28,80/forecast');
    foc.responseType = 'json';
    foc.send();
    foc.onload = () => {
        let forecasts = new Array(14);
        let data = JSON.parse(JSON.stringify(foc.response)).properties.periods;

        class Forecast {
            constructor(dayName, iconFile, desc, temp, windSpeed, windDir) {
                this.dayName = dayName;
                this.icon = iconFile;
                this.desc = desc;
                this.temp = temp;
                this.windSpeed = windSpeed;
                this.windDir = windDir;

                if (this.dayName.startsWith("This")) this.dayName = this.dayName.substring(5);
                if (this.dayName.endsWith(" Night")) this.dayName = "Night";
            }
        }

        let index = 0;
        while (index <= 5) {
            forecasts[index] = new Forecast(
                data[index].name,
                data[index].icon,
                data[index].shortForecast,
                data[index].temperature,
                data[index].windSpeed,
                data[index].windDirection
            );
            index++;
        }

        index = 0;
        while (index <= 4) {
            loadBlobImg(forecasts[index].icon, document.getElementById(index + "-icon"));
            document.getElementById(index + "-name").innerHTML = forecasts[index].dayName;
            document.getElementById(index + "-desc").innerHTML = forecasts[index].desc;
            document.getElementById(index + "-temp").innerHTML = forecasts[index].temp;
            document.getElementById(index + "-wind-dir").innerHTML = forecasts[index].windDir;
            document.getElementById(index + "-winds").innerHTML = forecasts[index].windSpeed;
            index++;
        }
    }
}

const loadAlerts = (alerts) => {
    let length = objectLength(alerts);
    if (length !== 0) {
        let index = 0;
        document.getElementById("alert-list").innerHTML = null
        while (index <= length - 1) {
            let endTime = new Date(alerts[index].properties.ends);
            let expireTime = new Date(alerts[index].properties.expires);
            if (endTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)" &&
                expireTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
                endTime = "further notice"
            } else if (endTime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
                endTime = parseWxTime(expireTime);
            } else endTime = parseWxTime(endTime);

            let alertItem = document.createElement("li");
            alertItem.innerHTML = alerts[index].properties.event + " until " + endTime;
            alertItem.dataset.id = alerts[index].properties.id;
            alertItem.addEventListener("click", () => {
                viewAlert(alertItem.dataset.id)
            }, false);

            if (alerts[index].properties.severity === "Extreme" && alerts[index].properties.event.endsWith("Warning") || alerts[index].properties.event.endsWith("Emergency")) {
                alertItem.classList.add("urgent")
            } else if (alerts[index].properties.severity === "Extreme" && alerts[index].properties.event.endsWith("Watch")) {
                alertItem.classList.add("important")
            }

            document.getElementById("alert-list").appendChild(alertItem);
            index++;
        }
        document.getElementById("alerts").style.display = "block";
    }
}

let activeZone = "https://api.weather.gov/alerts/active?zone=FLC117";
//activeZone = "https://api.weather.gov/alerts/active?area=FL";

const getAlerts = () => {
    let art = new XMLHttpRequest();
    art.open('GET', activeZone);
    art.responseType = 'json';
    art.send();
    art.onload = () => {
        loadAlerts(JSON.parse(JSON.stringify(art.response.features)))
    }
}

const getSurveys = () => {
    fetch("https://api.croomssched.tech/surveys").then((res) => {
        return res.json();
    }).then((data) => {
        loadSurveys(data.data);
    }).catch((error) => {
        alertBalloon("We encountered an issue loading the survey list.", error.message, 1);
    });
}

const loadSurveys = (surveys) => {
    document.querySelector("#survey-list").innerHTML = ""
    surveys.forEach((survey) => {
        let link = document.createElement("a");
        link.innerText = survey.name;
        link.href = survey.link;
        link.target = "CBSH-survey";

        let container = document.createElement("li");
        container.appendChild(link);
        document.querySelector("#survey-list").appendChild(container);
    })
}

function parseWxTime(endTime) {
    let endDay = endTime.getDay();
    if (endDay === new Date().getDay()) {
        endDay = " "
    } else {
        endDay = weekday[endDay] + " at "
    }

    return endDay + parseTime(endTime);
}

function parseTime(time) {
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

    let endMinute = time.getMinutes();
    if (endMinute < 10) endMinute = "0" + endMinute

    return endHour + ":" + endMinute + " " + apm;
}

getInfo();
setInterval(getInfo, 60000);
getAlerts();
setInterval(getAlerts, 60000);
getForecast();
setInterval(getForecast, 60000);
getSurveys();
setInterval(getSurveys, 60000);