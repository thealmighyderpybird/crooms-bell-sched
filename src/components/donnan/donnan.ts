export default function donnan() {
    window.open("/donnan", "donnanWindow", 'status=0,toolbar=0,width=720,height=480');
};

export const getDonnanPicture = () => {
    const donnanImgList = [
        "https://s7d2.scene7.com/is/image/TWCNews/screen_shot_2021-10-21at95515pm_10222021",
        "https://s7d2.scene7.com/is/image/TWCNews/vlcsnap-2021-06-14-23h39m25s473",
        "https://i.ytimg.com/vi/FH_xLF1VUk8/maxresdefault.jpg",
        "https://i.ytimg.com/vi/T5-to1TZxgk/maxresdefault.jpg"
    ];

    return donnanImgList[Math.floor(Math.random() * donnanImgList.length)]!;
}