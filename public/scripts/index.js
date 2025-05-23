const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
                    "November", "December"];
const today = new Date();
let day = weekday[today.getDay()];
if (0 < today.getDay() && today.getDay() < 6) {
    document.getElementById(day + "Lunch").classList.add("active");
}

function randomWindow() {
    const urls = ["/bob", "/teacher", "https://google.com", "https://bing.com", "https://catsinsinks.com",
        "https://app.croomssched.tech", "https://outlook.com", "https://collegeboard.org", "https://example.com",
        "https://github.com", "https://derpybird.glitch.me/error/404.html", "https://pcjs.org",];

    window.open(urls[getRandomInt(1, 13)]);
}

function openSettings() {
    let x = (screen.width / 2) - 200;
    let y = (screen.height / 2) - 420;
    let settingsWindow = window.open('/sched/settings/', 'cbsh-settings',
        'status=0,toolbar=0,location=0,width=400,height=720,screenX=' + x + ',screenY=' + y + ',popup=true');
    let isClosedInterval = setInterval(() => {
        if (settingsWindow.closed) {
            clearInterval(isClosedInterval);
            window.location.reload();
        }
    }, 50);
}

function createRotatingInfo() {
    document.getElementById("date-time").classList.add("active");
    setInterval(() => {
        document.getElementById("date-time").innerText = CBSHSched.time.date + "   " + CBSHSched.time.time;
        document.getElementById("current-period").innerText = CBSHSched.period.current + " ends in " + CBSHSched.period.remainingTime;
    }, 1000);

    setInterval(() => {
        document.getElementById("date-time").removeAttribute("class");
        document.getElementById("current-period").classList.add("active");
    }, 30000)

    setInterval(() => {
        document.getElementById("current-period").removeAttribute("class");
        document.getElementById("date-time").classList.add("active");
    }, 40000)
}

document.addEventListener('DOMContentLoaded', () => {
    const schedMessenger = new BroadcastChannel("sched-messenger");
    schedMessenger.onmessage = (event) => {
        if (event.data === "lessThan10Minutes") {
            let newBalloon = alertBalloon("Heads up!", "You have 10 minutes left in " + CBSHSched.period.current + ".", 0);

            setTimeout(() => {
                newBalloon.remove();
            }, 10000);
        } else if (event.data === "oneMinute") {
            let newBalloon = alertBalloon("Almost time!", "You have less than a minute left in " +
                CBSHSched.period.current + ". You might want to start getting ready to go.", 1);

            setTimeout(() => {
                newBalloon.remove();
            }, 10000);
        }
    };

    let goto = new URL(document.location).searchParams.get("goto");
    if (goto === "daily-poll" || goto === "poll") {
        loadTool("poll-viewer", "/tools/daily-poll/", false);
    } else if (goto === "download" || goto === "download-app" || goto === "app") {
        downloadApp();
    }

    let visitCounter = parseInt(localStorage.getItem("visitCounter"));
    if (isNaN(visitCounter)) {
        //welcome("index.html");
        localStorage.setItem("visitCounter", (1).toString());
    } else {
        visitCounter++;
        localStorage.setItem("visitCounter", visitCounter.toString());
    }

    createCBSHSched(document.querySelector("#schedule-widget > div"));
    createRotatingInfo();
});

function donnan() {
    const donnanImgList = [
        "https://s7d2.scene7.com/is/image/TWCNews/screen_shot_2021-10-21at95515pm_10222021",
        "https://s7d2.scene7.com/is/image/TWCNews/vlcsnap-2021-06-14-23h39m25s473",
        "https://i.ytimg.com/vi/FH_xLF1VUk8/maxresdefault.jpg",
        "https://i.ytimg.com/vi/T5-to1TZxgk/maxresdefault.jpg"
    ];

    window.open(donnanImgList[getRandomInt(0, donnanImgList.length)], "donnanWindow",
                'status=0,toolbar=0,width=720,height=480');
}