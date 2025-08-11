"use client";

import styles from "./oreo.module.css";
import { useState } from "react";

export default function OreoPage() {
    const [oreo, setOreo] = useState("oreoreo");

    return <div className={ styles.container }>
        <h1 className={ styles.title }>{ oreo }</h1>
        <label>
            give me an <input type="text" value={oreo} className={ styles.input }
                              onKeyUp={e => setCookies(e.currentTarget.value)}
                              onChange={e => setOreo(e.currentTarget.value)} />
        </label>
        <div className={ styles.content }>
            <div id="oreo" className={ styles.oreo }>
                <div className={ styles.o }></div>
                <div className={ styles.re }></div>
                <div className={ styles.o }></div>
                <div className={ styles.re }></div>
                <div className={ styles.o }></div>
            </div>
        </div>
    </div>
};

enum OreoEnum {
    Space = "space",
    Cookie = "o",
    Cream = "re",
}

const oreoClass = {
    [OreoEnum.Space]: styles.space,
    [OreoEnum.Cookie]: styles.o,
    [OreoEnum.Cream]: styles.re,
};

const setCookies = (value: string) => {
    const val = value.toLowerCase();

    const chars = val.split("");
    const tokens: string[] = [];

    chars.forEach((ch, i, chars) => {
        if (ch === "o") tokens.push("o");

        if (ch === "r") {
            if (chars[i + 1] === "e") {
                tokens.push("re");
            }
        }

        if (ch === "&" || ch === " ") tokens.push("space");
    });

    tokens.reverse();

    document.getElementById("oreo")!.innerHTML = "";
    tokens.forEach(token => {
        const el = document.createElement("div");
        // @ts-expect-error ignore that issue that won't happen ever
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        el.classList.add(oreoClass[token]);
        document.getElementById("oreo")!.appendChild(el);
    })
};