"use client";

import DialogCloseButton from "./dialog/DialogCloseButton";
import styles from "./dialog/dialog.module.css";
import React, { type ReactNode } from "react";

export default function Dialog({
    children, isModal, closeButton = true, backgroundClose = true, controlledWidth = false, controlledHeight = false,
    separateContent = false, setIsActiveAction,
}: {
    children: ReactNode, isModal?: boolean, closeButton?: boolean, backgroundClose?: boolean,
    controlledWidth?: boolean, controlledHeight?: boolean, separateContent?: boolean, setIsActiveAction: (value: boolean) => void,
}) {
    const computedStyles = `${controlledWidth ? " " + styles.controlledWidth : ""}` +
        `${controlledHeight ? " " + styles.controlledHeight : ""}` +
        `${separateContent ? " " + styles.separatedContent : ""}`;

    return <>
        <div className={ styles.dialog + computedStyles }>
            { closeButton ? <DialogCloseButton onClick={(e) => {
                e.stopPropagation();
                setIsActiveAction(false);
            }} /> : null }
            { children }
        </div>
        { isModal ? <div className={ styles.modal } onClick={(e) => {
            e.stopPropagation();
            if (backgroundClose) setIsActiveAction(false);
        }} /> : null }
    </>;
};