import localFont from "next/font/local";
import type {NextFontWithVariable} from "next/dist/compiled/@next/font";

export const segoe = localFont({
    src: "/fonts/SegUIVar.ttf",
    variable: "--segoe",
    // @ts-expect-error axes may not exist, but is used
    axes: ["opsz"],
});

export const torus = localFont({
    src: "/fonts/Torus.woff2",
    variable: "--torus",
});

export const studySans = localFont({
    src: "/fonts/CroomsschedSans/regular.woff2",
    variable: "--study-sans",
});

export const avenir = localFont({
    src: [
        { path: "/fonts/AvenirLTPro/45.otf" },
        { path: "/fonts/AvenirLTPro/35.otf", weight: "300" },
        { path: "/fonts/AvenirLTPro/65.otf", weight: "700" },
        { path: "/fonts/AvenirLTPro/85.otf", weight: "800" },
        { path: "/fonts/AvenirLTPro/95.otf", weight: "900" },
    ],
    variable: "--avenir",
});

export const aptos = localFont({
    src: [
        { path: "/fonts/Aptos/Aptos.ttf" },
        { path: "/fonts/Aptos/Aptos-Italic.ttf", style: "italic" },
        { path: "/fonts/Aptos/Aptos-Light.ttf", weight: "300" },
        { path: "/fonts/Aptos/Aptos-Light.ttf", weight: "300", style: "italic" },
        { path: "/fonts/Aptos/Aptos-SemiBold.ttf", weight: "600" },
        { path: "/fonts/Aptos/Aptos-SemiBold-Italic.ttf", weight: "600", style: "italic" },
        { path: "/fonts/Aptos/Aptos-Bold.ttf", weight: "700" },
        { path: "/fonts/Aptos/Aptos-Bold-Italic.ttf", weight: "700", style: "italic" },
        { path: "/fonts/Aptos/Aptos-ExtraBold.ttf", weight: "800" },
        { path: "/fonts/Aptos/Aptos-ExtraBold-Italic.ttf", weight: "800", style: "italic" },
        { path: "/fonts/Aptos/Aptos-Black.ttf", weight: "900" },
        { path: "/fonts/Aptos/Aptos-Black-Italic.ttf", weight: "900", style: "italic" },
    ],
    variable: "--aptos",
});

export const comic = localFont({
    src: [
        { path: "/fonts/Comic/comic.ttf" },
        { path: "/fonts/Comic/comicbd.ttf", weight: "700" },
        { path: "/fonts/Comic/comici.ttf", style: "italic" },
        { path: "/fonts/Comic/comicz.ttf", weight: "700", style: "italic" },
    ],
    variable: "--comic",
});

export const dos = localFont({
    src: "/fonts/dos.ttf",
    variable: "--dos",
});

export const wingdings = localFont({
    src: "/fonts/wingding.ttf",
    variable: "--wingdings",
});

enum fontEnum {
    wingdings = "Wingdings",
    studySans = "StudySans",
    avenir = "Avenir",
    comic = "Comic",
    segoe = "SegoeUI",
    torus = "Torus",
    aptos = "Aptos",
    dos = "DOS",
}

const fonts: Record<string, string> = {
    [fontEnum.wingdings]: wingdings.className,
    [fontEnum.studySans]: studySans.className,
    [fontEnum.avenir]: avenir.className,
    [fontEnum.comic]: comic.className,
    [fontEnum.segoe]: segoe.className,
    [fontEnum.torus]: torus.className,
    [fontEnum.aptos]: aptos.className,
    [fontEnum.dos]: dos.className,
};

export default fonts;