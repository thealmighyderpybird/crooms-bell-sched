const prowler = {
    posts: [],
    lastUpdated: new Date(),
    source: "https://api.croomssched.tech/feed",
    currentIndex: 0
};
const prowlerElement = document.getElementById("prowler-posts");

const getProwlerVerifiedSvg = (uid) => {
    let color = "rgb(66, 133, 244)";
    if (uid === "ef6e35c9be") color = "var(--tri)";
    if (uid === "GuyFromChina") color = "transparent";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill-rule="evenodd" style="fill: ${color};">
        <path d="M256 472.153L176.892 512l-41.725-81.129-86.275-16.654 11.596-91.422L0 256l60.488-66.795-11.596-91.422 86.275-16.654L176.892 0 256 39.847 335.108 0l41.725 81.129 86.275 16.654-11.596 91.422L512 256l-60.488 66.795 11.596 91.422-86.275 16.654L335.108 512z" />
        <path d="M211.824 284.5L171 243.678l-36 36 40.824 40.824-.063.062 36 36 .063-.062.062.062 36-36-.062-.062L376.324 192l-36-36z" fill="#fff"/>
    </svg>`;
};

const getProwler = () => {
    fetch(prowler.source).then((res) => {
        if (res.statusCode === 429) {
            alertBalloon("Prowler is currently busy.", "Please refresh Prowler in a few moments.", 1);
            return;
        }

        if (res.ok !== true) throw new Error(res.statusText || "Please retry in a few minutes.");
        return res.text();
    }).then((res) => {
                const data = JSON.parse(res);
        if (data.status !== "OK") return alertBalloon(
            "We encountered an issue loading Prowler.", data.data.error.message, 1);

        document.getElementById("prowler-posts").innerHTML = null;
        prowler.posts = data.data;
        loadPosts(0, 49);
    }).catch((error) => {
        alertBalloon("We encountered an issue loading Prowler.", error.message, 1);
    });
}

const loadProwler = (feeds) => {
    let length = objectLength(feeds);
    if (length === 0) {
        let noFeed = document.createElement("span");
        noFeed.innerHTML = "There are no Prowler posts. <a class='links' onclick='loadTool(`new-prowler-post`, `/tools/prowler`, false)'>Post something.</a>";
        noFeed.style.userSelect = "none";
        prowlerElement.innerHTML = noFeed.outerHTML;
        return;
    }

    feeds.forEach((update) => {
        const createTime = new Date(update.create);
        let fu = document.createElement("div");
        fu.dataset.id = update.id;
        fu.innerHTML = `<div class="corePostHeader">
            <img src="https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${update.uid}.png&default=pfp"
                 alt="${update?.createdBy + "'s " || ""}Profile Picture"
                 title="${update?.createdBy + "'s " || ""}Profile Picture"
                 draggable="false" class="profilePicture profilePictureMedium">
            <div class="corePostHeaderContent">
                <span class="username">
                    ${update?.createdBy || ""}
                    ${update?.verified === true ? getProwlerVerifiedSvg(update.uid) : ""}
                </span>
                <span>` + `
                    ${monthNames[createTime.getMonth()]}
                    ${createTime.getDate()},
                    ${createTime.getFullYear()}
                    ${parseTime(new Date(createTime))}
                </span>
            </div></div><div class="corePostContent">${update.data}</div>`;

        prowlerElement.appendChild(fu);
    });
}

const loadPosts = (start, end) => {
    const posts = [];
    for (let i = start; i <= end; i++) {
        posts.push(prowler.posts[i]);
        prowler.currentIndex++;
    }
    loadProwler(posts);
    hasFired = false;
};

const getNewPosts = () => {
    fetch(prowler.source).then((res) => {
        if (res.status === 429) {
            alertBalloon("Prowler is currently busy.", "Please refresh Prowler in a few moments.", 1);
            return;
        }

        if (res.ok !== true) throw new Error(res.statusText || "Please retry in a few minutes.");
        return res.text();
    }).then((res) => {
        const data = JSON.parse(res);
        if (data.status !== "OK") return alertBalloon(
            "We encountered an issue updating Prowler.", data.data.error.message, 1);

        const newPostCount = data.data.length - prowler.posts.length;
        const newParent = document.createElement("div");
        data.data.forEach((post, i) => {
            const oldPost = prowler.posts[i - newPostCount]; let newPost;
            try {
                newPost = data.data.find(post => post.id === oldPost.id);
                if (newPost && newPost.data !== oldPost.data) {
                    document.querySelector(`#prowler-posts div[data-id="${newPost.id}"] .corePostContent`).innerHTML = newPost.data;
                    prowler.posts[i - newPostCount].data = newPost.data;
                }
            } catch {
                newPost = data.data.find(post => post.id === data.data[i].id);
                const createTime = new Date(newPost.create);
                let fu = document.createElement("div");
                fu.dataset.id = newPost.id;
                fu.innerHTML = `<div class="corePostHeader">
                    <img src="https://mikhail.croomssched.tech/crfsapi/FileController/ReadFile?name=${newPost.uid}.png&default=pfp"
                         alt="${newPost?.createdBy + "'s " || ""}Profile Picture"
                         title="${newPost?.createdBy + "'s " || ""}Profile Picture"
                         draggable="false" class="profilePicture profilePictureMedium">
                    <div class="corePostHeaderContent">
                        <span class="username">
                            ${newPost?.createdBy || ""}
                            ${newPost?.verified === true ? getProwlerVerifiedSvg(newPost.uid) : ""}
                        </span>
                        <span>` + `
                            ${monthNames[createTime.getMonth()]}
                            ${createTime.getDate()},
                            ${createTime.getFullYear()}
                            ${parseTime(new Date(createTime))}
                        </span>
                    </div></div><div class="corePostContent">${newPost.data}</div>`;

                prowler.posts.unshift(newPost);
                newParent.appendChild(fu);
            }
        });

        for (let i = newParent.children.length - 1; i >= 0; i--) {
            prowlerElement.prepend(newParent.children.item(i));
        }
    }).catch((error) => {
        alertBalloon("We encountered an issue updating Prowler.", error.message, 1);
    });
};

let hasFired = false;
let maxThreshold = 100;
prowlerElement.addEventListener('scroll', () => {
    const scrollTop = prowlerElement.scrollTop;
    const scrollHeight = prowlerElement.scrollHeight;
    const clientHeight = prowlerElement.clientHeight;

    const scrollPercent = (scrollTop + clientHeight) / scrollHeight * 100;

    if (!hasFired && scrollPercent >= 95 && scrollPercent < maxThreshold) {
        hasFired = true;
        loadPosts(prowler.currentIndex, prowler.currentIndex + 50);
    }
});

getProwler();
setInterval(getNewPosts, 60000);