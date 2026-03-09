"use client";

import { type CookieValueTypes, type OptionsType, useGetCookie } from "cookies-next/client";
import styles from "~/styles/fileUploader.module.css";
import { getSettings } from "./ExportButton";
import Script from "next/script";
import { useState } from "react";

export default function BannerFileUploader({ uploadAction }: { uploadAction: (e: object, matchingKeys: string[]) => void }) {
    const [error, setError] = useState("");
    const getCookie = useGetCookie();

    const upload = async (file: File) => {
        setError("");
        if (file.type !== "application/json") {
            setError("Invalid file type, only JSON files are allowed.");
            return;
        }

        try {
            const data = JSON.parse(await file.text());
            const { matches, matchingKeys } = getSchemaValidation(data, getCookie);
            if (matches === 0) {
                setError("This file does not contain Crooms Bell Schedule settings or is corrupted.");
                return;
            }

            uploadAction(data, matchingKeys);
        }
        catch (e: any) {setError(e.message)}
    };

    return <>
        <input type="file" id="file-input" accept="application/json"  hidden={true}
               onClick={e => {
                   document.getElementById("drop-zone")!.classList.add("focus");
                   e.currentTarget.files = null;
                   setError("");
               }}
               onChange={e => {
                   document.getElementById("drop-zone")!.classList.remove("focus");
                   if (e.currentTarget.files![0]) void upload(e.currentTarget.files![0]);
               }}
        />
        <div className={`${ styles.fileDropZone } ${ styles.noSelect } fileUploader`}
             id="drop-zone" onClick={() => document.getElementById("file-input")!.click()}
             onDragOver={e => {
                 e.preventDefault();
                 document.getElementById("drop-zone")!.classList.add("focus");
             }}
             onDragLeave={() => document.getElementById("drop-zone")!.classList.remove("focus")}
             onDrop={e => {
                 e.preventDefault();
                 document.getElementById("drop-zone")!.classList.remove("focus");

                 const file = e.dataTransfer.files[0];
                 if (file) void upload(file);
             }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="3rem" height="3rem">
                <path d="M15 3a.5.5 0 0 0 .09-.99H4a.5.5 0 0 0-.09.98L4 3h11ZM9.5 18a.5.5 0 0 0 .5-.41V5.7l3.64 3.65c.17.18.44.2.64.06l.07-.06a.5.5 0 0 0 .06-.63l-.06-.07-4.5-4.5A.5.5 0 0 0 9.6 4h-.1a.5.5 0 0 0-.4.19L4.64 8.65a.5.5 0 0 0 .64.76l.07-.06L9 5.71V17.5c0 .28.22.5.5.5Z"
                      fill="currentColor" />
            </svg>
            <h3 style={{fontWeight: "normal"}}>Upload your file here.</h3>
            <p>Drag &amp; drop your file here to be uploaded.</p>
            { error !== "" && <p className="text-(--warn) text-xs px-8 text-center leading-none">{error}</p> }
        </div>
        <Script id="cancel-event-listener">
            {'document.getElementById("file-input").addEventListener("cancel", document.getElementById("drop-zone").classList.remove("focus"));'}
        </Script>
    </>;
};

const getSchemaValidation = (json: object, getCookie: (key: string, options?: OptionsType | undefined) => CookieValueTypes) => {
    const targetKeys = Object.keys(getSettings(getCookie));
    const sourceKeys = Object.keys(json);
    const matchingKeys: string[] = [];
    let matches = 0;

    targetKeys.forEach(key => {
        if (sourceKeys.find(k => k === key)) {
            matchingKeys.push(key);
            matches++;
        }
    });

    return { matches, targetKeys, sourceKeys, matchingKeys };
};