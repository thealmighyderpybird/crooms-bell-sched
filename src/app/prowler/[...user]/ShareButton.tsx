"use client";

import useAlert from "~/AlertContext";

export default function LinkCopy({ username, displayName }: { username: string, displayName: string }) {
    const { createAlertBalloon } = useAlert();
    return <button onClick={(): void => void shareLink(username, displayName, createAlertBalloon)}>
            Share Profile</button>;
};

const shareLink = async (username: string, displayName: string,
                         newAlert: (title: string, message: string, severity?:  0 | 1 | 2 | -1) => void) => {
    try {
        await navigator.share({
            url: "https://www.croomssched.tech/prowler/" + (username ?? ""),
            title: (displayName ?? username) + " | Prowler"
        });
    } catch {
        try {
            await navigator.clipboard.writeText("https://www.croomssched.tech/prowler/" + (username ?? ""));
            newAlert("Copied Link to Clipboard", "The link to your tree is in your clipboard. " +
                "Just paste it wherever you want to share.", 0);
        } catch {
            alert("Copy the link below:\nhttps://www.croomssched.tech/prowler/" + (username ?? ""))
        }
    }
};