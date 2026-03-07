"use client";

import { resetSettings } from "~/lib/settingsManager";
import Dialog from "~/components/Dialog";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function ResetButton() {
    const [isActive, setIsActive] = useState(false);

    return <>
        <button style={{ minWidth: "8rem" }} onClick={() => setIsActive(true)}>Reset Settings</button>
        { isActive && createPortal(<ResetModal setIsActive={setIsActive} />, document.getElementById("modal-portal")!) }
    </>;
};

const ResetModal = ({ setIsActive }: { setIsActive: (value: boolean) => void }) => {
    return <Dialog isModal separateContent closeButton={false} setIsActiveAction={setIsActive}>
        <div>
            <h2 className="-mt-1!">Reset Settings</h2>
            <main>
                <p>Are you sure you want to reset your settings?</p>
            </main>
        </div>
        <footer>
            <button onClick={() => setIsActive(false)}>No</button>
            <button onClick={() => resetSettings()}>Yes</button>
        </footer>
    </Dialog>;
};