"use client";

import OptionSlider from "~/components/settings/OptionSlider";
import SettingsFileUploader from "./SettingsFileUploader";
import { importSettings } from "~/lib/settingsManager";
import type Settings from "~/types/settings";
import Dialog from "~/components/Dialog";
import { createPortal } from "react-dom";
import { useState } from "react";

export default function ImportButton() {
    const [isActive, setIsActive] = useState(false);

    return <>
        <button style={{ minWidth: "8rem" }} onClick={() => setIsActive(true)}>Import Settings</button>
        { isActive && createPortal(<ImportModal setIsActive={setIsActive} />, document.getElementById("modal-portal")!) }
    </>;
};

const idResolver: Record<string, string> = {
    widgets: "Widgets",
    accentColor: "Accent Color",
    theme: "Color Scheme",
    font: "Font",
    defaultLunch: "Default Lunch",
    showTimeRemainingRing: "Schedule Progress Bar",
    layout: "Widget Layout",
    clippy: "Clippy",
    periodNames: "Period Names",
};

const ImportModal = ({ setIsActive }: { setIsActive: (value: boolean) => void }) => {
    const [keysToImport, setKeysToImport] = useState<Record<string, boolean>>({});
    const [uploadData, setUploadData] = useState<Record<string, any>>({});
    const [matchingKeys, setMatchingKeys] = useState<string[]>([]);
    const [page, setPage] = useState(1);

    const uploadAction = (data: object, matchingKeys: string[]) => {
        const importableKeys: Record<string, boolean> = {};

        matchingKeys.forEach(key => importableKeys[key] = true);
        setKeysToImport(importableKeys);
        setMatchingKeys(matchingKeys);
        setUploadData(data);
        setPage(2);
    };

    return <Dialog isModal={true} controlledWidth={true} controlledHeight={page !== 1} separateContent={true}
                   setIsActiveAction={setIsActive} closeButton={page !== 2} backgroundClose={page === 1}>
        <div>
            <h2 className={`-mt-1!${page === 1 ? " mb-4!" : ""}`}>Import Settings</h2>
            <main>
                { page === 1 && <SettingsFileUploader uploadAction={uploadAction} /> }
                { page === 2 && <>
                    <p>Choose what settings you would like to import.</p>
                    <div className="flex flex-col gap-1 overflow-y-auto max-h-29.75">{ matchingKeys.map(setting =>
                        <div className="bg-(--sec) rounded-lg p-2 leading-none flex justify-between" key={setting}>
                            <span className="leading-none">{idResolver[setting]}</span>
                            <OptionSlider checked={keysToImport[setting]!} onChange={e => {
                                const newKeysToImport = Object.assign({}, keysToImport);
                                newKeysToImport[setting]! = e;
                                setKeysToImport(newKeysToImport);
                            }} />
                        </div>
                    )}</div>
                </> }
                { page === 3 && <>
                    <p>The import was successful.</p>
                    <p>A page refresh is recommended to allow the imported settings to apply.</p>
                </> }
            </main>
        </div>
        { page === 2 && <footer>
            <button onClick={() => setPage(1)}>Upload a Different File</button>
            <button onClick={() => {
                const result = importSettingsAction(uploadData, keysToImport);
                if (result) setPage(3);
            }}>Import</button>
        </footer> }
        { page === 3 && <footer>
            <button onClick={() => window.location.reload()}>Reload</button>
        </footer> }
    </Dialog>;
};

const importSettingsAction = (settings: Record<string, any>, keysToImportRecord: Record<string, boolean>) => {
    const entriesToConsider = Object.entries(keysToImportRecord);
    const settingsToInclude: Record<string, any> = {};

    entriesToConsider.forEach(item => {
        if (item[1] && item[0] !== "periodNames") settingsToInclude[item[0]] = settings[item[0]];
        else if (item[1] && item[0] === "periodNames") settingsToInclude[item[0]] = JSON.stringify(settings[item[0]]);
    });

    return importSettings(settingsToInclude as Settings);
};