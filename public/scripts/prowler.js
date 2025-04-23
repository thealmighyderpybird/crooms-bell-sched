const prowler = {
    posts: [],
    lastUpdated: new Date(),
    source: "https://api.croomssched.tech/feed"
}

const getProwler = () => {
    fetch(prowler.source).then((res) => {
        return res.text();
    }).then((res) => {
        if (res.toLowerCase().includes("too many requests") && !res.includes("{")) return alertBalloon(
            "Prowler is currently busy.", "Please refresh Prowler in a few moments.", 1);

        const data = JSON.parse(res);
        if (data.status !== "OK") return alertBalloon(
            "We encountered an issue loading Prowler.", data.data.error.message, 1);

        document.getElementById("prowler-posts").innerHTML = null;
        prowler.posts = data.data;
        loadPosts(0, data.data.length);
    }).catch((error) => {
        alertBalloon("We encountered an issue loading Prowler.", error.message, 1);
    });
}

const loadProwler = (feeds) => {
    const verifiedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill-rule="evenodd" style="fill: rgb(66, 133, 244);">
        <path d="M256 472.153L176.892 512l-41.725-81.129-86.275-16.654 11.596-91.422L0 256l60.488-66.795-11.596-91.422 86.275-16.654L176.892 0 256 39.847 335.108 0l41.725 81.129 86.275 16.654-11.596 91.422L512 256l-60.488 66.795 11.596 91.422-86.275 16.654L335.108 512z" />
        <path d="M211.824 284.5L171 243.678l-36 36 40.824 40.824-.063.062 36 36 .063-.062.062.062 36-36-.062-.062L376.324 192l-36-36z" fill="#fff"/>
    </svg>`;

    let length = objectLength(feeds);
    if (length === 0) {
        let noFeed = document.createElement("span");
        noFeed.innerHTML = "There are no Prowler posts. <a class='links' onclick='loadTool(`new-prowler-post`, `/tools/prowler`, false)'>Post something.</a>";
        noFeed.style.userSelect = "none";
        document.getElementById("prowler-posts").innerHTML = noFeed.outerHTML;
        return;
    }

    feeds.forEach((update) => {
        const createTime = new Date(update.create);
        let fu = document.createElement("div");
        fu.innerHTML = `<div class="corePostHeader">
            <!--<img src="https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${update.uid}.png&default=pfp"
                 alt="${update?.createdBy + "'s " || ""}Profile Picture"
                 title="${update?.createdBy + "'s " || ""}Profile Picture"
                 draggable="false" class="profilePicture profilePictureMedium">-->
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
    });
}

const loadPosts = (start, end) => {
    const posts = [];
    for (let i = start; i <= end; i++) {
        prowler.posts[i].index = i;
        posts.push(prowler.posts[i]);
    }
    loadProwler(posts);
};

getProwler();