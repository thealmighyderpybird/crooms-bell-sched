"use client";

import styles from "~/components/dialog/dialog.module.css";
import postStyles from "./postOverlay.module.css";
import CBSHServerURL from "~/lib/CBSHServerURL";
import useAlert from "~/AlertContext";

export default function UploadDialog({ sid, setIsActive }: { sid: string, setIsActive: (arg0: boolean) => void }) {
    const { createAlertBalloon } = useAlert();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type (e.g., images only)
            if (!file.type.startsWith('image/')) {
                createAlertBalloon("Invalid File", "Please select an image file.", 2);
                return;
            }
            // Optionally, you can store the file in state or prepare for upload
        }
    };

    return <>
        <div className="modal" onClick={() => setIsActive(false)}></div>
        <div className={`${styles.dialog} ${styles.controlledWidth} ${styles.controlledHeight} ${styles.separatedContent}`}>
            <div className={postStyles.content}>
                <header><h2>Upload Image</h2></header>
                <main className={postStyles.content}>
                    <p>Select an image to upload:</p>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </main>
            </div>
            <div className={styles.actionButtons}>
                <button onClick={() => setIsActive(false)}>Cancel</button>
                <button onClick={() => uploadImage(sid, setIsActive, createAlertBalloon)}>Upload</button>
            </div>
        </div>
    </>
};

const uploadImage = async (sid: string, setIsActive: (arg0: boolean) => void,
                           createAlertBalloon: (title: string, message: string, severity: -1|0|1|2) => void) => {
    // Note: This is a placeholder for the actual upload logic.
    // You need to implement the file upload to your server endpoint.
    // For example, using FormData to send the file.

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
        createAlertBalloon("No File Selected", "Please select a file to upload.", 2);
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const r = await fetch(CBSHServerURL + "/upload", {  // Replace with actual upload endpoint
            method: "POST",
            headers: {
                "Authorization": JSON.stringify(sid),
            },
            body: formData,
        });

        if (r.status === 200) {
            setIsActive(false);
            createAlertBalloon("Success", "Image uploaded successfully.", 1);
            return;
        }

        const res = await r.json() as { data: { error: string } };
        createAlertBalloon("Failed to upload", res.data.error, 2);
    } catch (error) {
        createAlertBalloon("Error", "An error occurred during upload.", 2);
    }
};
