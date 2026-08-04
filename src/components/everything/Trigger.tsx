"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MenuModal from "./MenuModal";

export default function Trigger() {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === " " && e.ctrlKey) setIsActive(true);
        };

        document.body.addEventListener("keydown", handleKey);
        return () => document.body.removeEventListener("keydown", handleKey);
    }, []);

    return <>{ isActive && createPortal(<MenuModal setActiveAction={setIsActive} />,
        document.getElementById("modal-portal")!) }</>;
};