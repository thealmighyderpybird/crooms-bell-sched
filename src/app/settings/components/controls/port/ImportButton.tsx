"use client";

import DialogTrigger from "~/components/DialogTrigger";
import Dialog from "~/components/Dialog";

export default function ImportButton() {
    return <DialogTrigger popup={<ImportModal />}>
        <button style={{ minWidth: "8rem" }}>Import Settings</button>
    </DialogTrigger>;
};

const ImportModal = () => {
    return <Dialog isModal={true} controlledWidth={true} controlledHeight={true}>
        <header>
            <h1>Import Settings</h1>
        </header>
    </Dialog>;
};