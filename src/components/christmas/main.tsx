"use client";

import styles from "./main.module.css";
import ChristmasMenu from "./Menu";
import { useState } from "react";
import ChristmasButton from "~/components/christmas/Button";

export default function ChristmasCorner() {
    const [menuActive, setMenuActive] = useState(false);

    return <div className={ styles.main } id="christmas-menu">
        <ChristmasMenu disableAction={() => setMenuActive(false)} hidden={!menuActive} />
        <ChristmasButton onClickAction={() => setMenuActive(true)} hidden={menuActive} />
    </div>
}