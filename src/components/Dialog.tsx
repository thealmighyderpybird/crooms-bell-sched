"use client";

import DialogCloseButton from "./dialog/DialogCloseButton";
import styles from "./dialog/dialog.module.css";
import React, { type ReactNode } from "react";

export default function Dialog({
    children, isModal, closeButton = true, backgroundClose = true, controlledWidth, controlledHeight, setIsActive,
}: {
    children: ReactNode, isModal?: boolean, closeButton?: boolean, backgroundClose?: boolean,
    controlledWidth?: boolean, controlledHeight?: boolean, setIsActive?: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const computedStyles = `${controlledWidth ? " " + styles.controlledWidth : ""}
                            ${controlledHeight ? " " + styles.controlledHeight : ""}`;

    return <>
        <div className={ styles.dialog + computedStyles }>
            { closeButton ? <DialogCloseButton onClick={() => { // @ts-expect-error possibly undefined
                setIsActive(false)
            }} /> : null }
            { children }
        </div>
        { isModal ? <div className={ styles.modal } onClick={(e) => {
            e.stopPropagation(); // @ts-expect-error possibly undefined
            if (backgroundClose) setIsActive(false)
        }} /> : null }
    </>;
};