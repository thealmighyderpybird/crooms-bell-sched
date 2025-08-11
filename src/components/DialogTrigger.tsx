"use client";

import { type ReactNode, useState, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";

export default function DialogTrigger({ children, popup }: { children: ReactNode, popup: ReactNode }) {
    const [isActive, setIsActive] = useState(false);

    const popupWithProps = isValidElement(popup)
        // @ts-expect-error no overload matches my ass
        ? cloneElement(popup, { setIsActive })
        : null;

    return <div tabIndex={1} onClick={() => setIsActive(true)}>
        { children }
        { isActive ? createPortal(popupWithProps, document.getElementById("modal-portal")!) : null }
    </div>;
}