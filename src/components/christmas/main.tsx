"use client";

import styles from "./main.module.css";
import ChristmasButton from "./Button";
import ChristmasMenu from "./Menu";
import { useState } from "react";

export default function ChristmasCorner() {
    const [menuActive, setMenuActive] = useState(false);

    return <aside className={ styles.main } id="christmas-menu">
        <ChristmasMenu disableAction={() => setMenuActive(false)} hidden={!menuActive} />
        <ChristmasButton onClickAction={() => setMenuActive(true)} hidden={menuActive} />
    </aside>
}