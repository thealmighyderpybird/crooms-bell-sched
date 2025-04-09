if (retrieveIdentity().sid === undefined || retrieveIdentity().sid === null) location.href = "https://admin.croomssched.tech/sso?host=croomssched.tech";

function retrieveIdentity() {
    try {
        return {uid: localStorage.getItem("UID"), sid: localStorage.getItem("SID")}
    } catch {
        alertBalloon("We couldn't post your Tweet",
            "Make sure you're signed into your account and try again.", 2);
    }
}

document.querySelector("#feed-form > footer > button").addEventListener("click", submitFeedUpdate);

async function submitFeedUpdate() {
    const feed = document.getElementById("feed-update");
    const link = document.getElementById("feed-link");
    const regex = /^https:?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4])|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+[a-z\u00a1-\uffff]{2,}\.?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i

    function convertHTML(str) {
        const htmlEntities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&apos;",
            "[": "<",
            "]": ">"
        };
        return str
            .split("")
            .map(entity => htmlEntities[entity] || entity)
            .join("");
    }

    function feedCreationError(message) {
        const error = document.createElement("p");
        error.innerText = message;
        document.querySelector("main").appendChild(error);
        error.classList.add("error");
        feed.addEventListener("keydown", () => {error.remove()});
        document.querySelector("button").addEventListener("click", () => error.remove());
    }

    if (feed.value === "") {
        feedCreationError("Please enter a Tweet.");
        return;
    }
    if (link.value && !regex.test(link.value)) {
        feedCreationError("The link entered is not valid. Please enter a valid link starting with \"https://\".");
        return;
    }
    let data = convertHTML(feed.value);
    if (data.includes("<script") || data.includes("<iframe") || data.includes("<object") || data.includes("<embed") || data.includes("<template") || data.includes("<link")) {
        feedCreationError("Scripts, embedded webpages, and embedded objects are not allowed.");
        return;
    }
    if (data.includes("<img") || data.includes("<picture") || data.includes("<audio") || data.includes("<video") || data.includes("<source")) {
        feedCreationError("Please add a link to your multimedia content.");
        return;
    }
    if (data.includes("<a")) {
        feedCreationError("Please use the link section to add a link.");
        return;
    }
    if (link.value) {
        data = "<a target=CBSHfeed href="+ link.value +">" + data + "</a>";
    }

    const request = new Request("https://api.croomssched.tech/feed", {
        method: "POST",
        body: JSON.stringify({
            "data": data
        }),
        headers: {
            "Authorization": JSON.stringify(retrieveIdentity().sid),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })

    const response = await fetch(request);
    const status = await response.json();

    if (status.data.error === "One of the following keys is missing or is empty in request body: 'data'") {
        feedCreationError("Please enter a Tweet.");
    } else if (status.data.error) {
        const error = document.createElement("p");
        error.innerText = status.data.error;
        document.querySelector("main").appendChild(error);
        error.classList.add("error");
        document.querySelector("button").addEventListener("click", () => {error.remove()});
    } else {
        showSuccessMessage();
    }

    function showSuccessMessage() {
        document.querySelector("main").classList.add("hidden");
        const successHeader = document.createElement("h2");
        successHeader.innerText = "Your Tweet was submitted";
        document.querySelector("header > h1").replaceWith(successHeader);
        document.querySelector("header > p").innerText = "It may take a moment for your Tweet to be reviewed.";
        document.querySelector("button").innerText = "Add another";
        document.querySelector("button").removeEventListener("click", submitFeedUpdate);
        document.querySelector("button").addEventListener("click", feedCreationToolReload);
    }
}

function feedCreationToolReload() {
    const header = document.createElement("h1"); header.innerText = "Tweeter";
    document.querySelector("header > h2").replaceWith(header);
    document.querySelectorAll("main > div > input").forEach((input) => input.value = "");
    document.querySelector("button").addEventListener("click", submitFeedUpdate);
    document.querySelector("button").removeEventListener("click", feedCreationToolReload);
    document.querySelector("main").classList.remove("hidden");
}