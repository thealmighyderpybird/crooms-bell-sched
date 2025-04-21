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
    if (0 < day && day < 6) {
        document.getElementById("DailyLunchImage").src = information.lunch[day].image;
    }
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

const getFeed = () => {
    fetch("https://api.croomssched.tech/feed").then((res) => {
        return res.json();
    }).then((res) => {
        loadFeed(res.data);
    }).catch((error) => {
        alertBalloon("We encountered an issue loading Prowler.", error.message, 1);
    });
}

const loadFeed = (feeds) => {
    const verifiedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill-rule="evenodd" style="fill: rgb(66, 133, 244);">
        <path d="M256 472.153L176.892 512l-41.725-81.129-86.275-16.654 11.596-91.422L0 256l60.488-66.795-11.596-91.422 86.275-16.654L176.892 0 256 39.847 335.108 0l41.725 81.129 86.275 16.654-11.596 91.422L512 256l-60.488 66.795 11.596 91.422-86.275 16.654L335.108 512z" />
        <path d="M211.824 284.5L171 243.678l-36 36 40.824 40.824-.063.062 36 36 .063-.062.062.062 36-36-.062-.062L376.324 192l-36-36z" fill="#fff"/>
    </svg>`;

    let amnt = objectLength(feeds);
    if (amnt === 0) {
        let noFeed = document.createElement("span");
        noFeed.innerHTML = "There are no Prowler posts. <a class='links' onclick='loadTool(`new-prowler-post`, `/tools/prowler`, false)'>Post something.</a>";
        noFeed.style.userSelect = "none";
        document.getElementById("prowler-posts").innerHTML = noFeed.outerHTML;
        return;
    }

    document.getElementById("prowler-posts").innerHTML = null;
    feeds.forEach((update) => {
        const createTime = new Date(update.create);
        let fu = document.createElement("div");
        fu.innerHTML = `<div class="corePostHeader">
            <img src="https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${update.uid}.png&default=pfp"
                 alt="${update?.createdBy + "'s " || ""}Profile Picture"
                 title="${update?.createdBy + "'s " || ""}Profile Picture"
                 draggable="false" class="profilePicture profilePictureMedium">
            <div class="corePostHeaderContent">
                <span class="username">
                    ${update?.createdBy || ""}
                    ${update?.verified === true ? verifiedSVG : ""}
                </span>
                <span>` + `
                    ${monthNames[createTime.getMonth()]}
                    ${createTime.getDate()},
                    ${createTime.getFullYear()}
                    ${parseTime(new Date(createTime))}
                </span>
            </div></div><div>${update.data}</div>`;
        document.getElementById("prowler-posts").appendChild(fu);
    });
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
            document.getElementById(index + "-name").innerHTML = forecasts[index].dayName;
            document.getElementById(index + "-icon").src = forecasts[index].icon;
            document.getElementById(index + "-desc").innerHTML = forecasts[index].desc;
            document.getElementById(index + "-temp").innerHTML = forecasts[index].temp;
            document.getElementById(index + "-wind-dir").innerHTML = forecasts[index].windDir;
            document.getElementById(index + "-winds").innerHTML = forecasts[index].windSpeed;
            index++;
        }
    }
}

const loadAlerts = (wxalert) => {
    let amnt = objectLength(wxalert);
    if (amnt !== 0) {
        let index = 0;
        let apm, isUrgent;
        document.getElementById("alert-list").innerHTML = null
        while (index <= amnt - 1) {
            let endtime = new Date(wxalert[index].properties.ends);
            let expiretime = new Date(wxalert[index].properties.expires);
            if (endtime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)" &&
                expiretime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
                endtime = "further notice"
            } else if (endtime.toString() === "Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)") {
                endtime = parseWxTime(expiretime);
            } else endtime = parseWxTime(endtime);

            let alertItem = document.createElement("li");
            alertItem.innerHTML = wxalert[index].properties.event + " until " + endtime;
            alertItem.dataset.id = wxalert[index].properties.id;
            alertItem.addEventListener("click", () => {
                viewAlert(alertItem.dataset.id)
            }, false);

            if (wxalert[index].properties.severity === "Extreme" && wxalert[index].properties.event.endsWith("Warning") || wxalert[index].properties.event.endsWith("Emergency")) {
                alertItem.classList.add("urgent")
            } else if (wxalert[index].properties.severity === "Extreme" && wxalert[index].properties.event.endsWith("Watch")) {
                alertItem.classList.add("important")
            }

            document.getElementById("alert-list").appendChild(alertItem);
            index++;
        }
        document.getElementById("alerts").style.display = "block";
    }
}

let altloc = "https://api.weather.gov/alerts/active?zone=FLC117";
//altloc = "https://api.weather.gov/alerts/active?area=FL";

const getAlerts = () => {
    let art = new XMLHttpRequest();
    art.open('GET', altloc);
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

function parseWxTime(endtime) {
    let apm;
    let endday = endtime.getDay();
    if (endday === new Date().getDay()) {
        endday = " "
    } else {
        endday = weekday[endday] + " at "
    }

    let endhour = endtime.getHours();
    if (endhour > 12) {
        endhour -= 12;
        apm = "PM"
    } else if (endhour === 12) {
        apm = "PM"
    } else if (endhour === 0) {
        endhour = 12;
        apm = "AM"
    } else {
        apm = "AM"
    }

    let endminute = endtime.getMinutes();
    if (endminute < 10) {
        endminute = "0" + endminute
    }

    return endday + endhour + ":" + endminute + " " + apm;
}

function parseTime(endtime) {
    let apm;
    let endhour = endtime.getHours();
    if (endhour > 12) {
        endhour -= 12;
        apm = "PM"
    } else if (endhour === 12) apm = "PM";
    else if (endhour === 0) {
        endhour = 12;
        apm = "AM"
    } else apm = "AM";

    let endminute = endtime.getMinutes();
    if (endminute < 10) endminute = "0" + endminute

    return endhour + ":" + endminute + " " + apm;
}

getInfo();
setInterval(getInfo, 60000);
getAlerts();
setInterval(getAlerts, 60000);
getForecast();
setInterval(getForecast, 60000);
getSurveys();
setInterval(getSurveys, 60000);
getFeed();