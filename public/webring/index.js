const style = document.createElement("link");
style.href = "/webring/index.css";
style.rel = "stylesheet";
style.type = "text/css";

const webring = document.createElement("div");
webring.style.display = "none";
webring.id = "cbsh-webring";

const header = document.createElement("header");
header.innerHTML = "<span></span><span></span>";

const main = document.createElement("main");
main.innerHTML = "this is a webring!"

webring.appendChild(header);
webring.appendChild(style);
webring.appendChild(main);
document.body.appendChild(webring);
displayWebring();

function displayWebring() {
    webring.style.opacity = "0";
    webring.style.display = "block";
    setTimeout(() => webring.style.opacity = "1", 1000);
}