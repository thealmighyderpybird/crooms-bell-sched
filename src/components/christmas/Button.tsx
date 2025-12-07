"use client";

import { type MouseEventHandler, useState } from "react";
import styles from "./Button.module.css";

export default function ChristmasButton({ onClickAction, hidden }: { onClickAction: MouseEventHandler<HTMLDivElement>, hidden: boolean }) {
    const [hover, setHover] = useState(false);

    return <>
        { hover && <div hidden={hidden} className={ styles.toolTip }>Christmas Menu</div> }
        <div className={ styles.button } hidden={hidden} onClick={onClickAction} onMouseOver={() => setHover(true)}
             onMouseOut={() => setHover(false)}>
            <div className={ styles.child } /></div>
    </>;
}