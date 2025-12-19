"use client";

import DialogCloseButton from "~/components/dialog/DialogCloseButton";
import dialogStyles from "~/components/dialog/dialog.module.css";
import sanitizeContent from "~/lib/SanitizeContent";
import CBSHServerURL from "~/lib/CBSHServerURL";
import styles from "./dialogStyles.module.css";
import LiveEdit from "~/components/LiveEdit";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import useAlert from "~/AlertContext";
import Link from "next/link";

const pronounList = ["he", "him", "his", "she", "her", "hers", "they", "them", "theirs", "it", "ce", "cir",
    "co", "cos", "cy", "cos", "cy", "cyr", "ey", "em", "eir", "hey", "hem", "heir", "ne", "nem", "nir", "qui", "quem",
    "quis", "sie", "hir", "tey", "tem", "teir", "xe", "xem", "xyr", "xie", "yo", "yos", "ze", "zir", "ve", "vis", "ver"];
type NewAlert = (title: string, message: string, severity: -1|0|1|2) => void;

export default function EditButton({ sid, pronouns, bio }: { sid: string, pronouns: string[], bio: string }) {
    const [active, setActive] = useState(false);
    const { createAlertBalloon } = useAlert();

    return <>
        <button onClick={() => setActive(true)}>Edit Profile</button>
        { active && createPortal(
            <EditDialog setActive={setActive} ogDetails={{bio, pronouns}} sid={sid} newAlert={createAlertBalloon} />,
            document.getElementById("modal-portal")!) }
    </>;
};

const EditDialog = ({ setActive, ogDetails, sid, newAlert }: {
        setActive: (value: boolean) => void, ogDetails: { bio: string, pronouns: string[] }, sid: string, newAlert: NewAlert
}) => {
    const [pronouns, setPronouns] = useState<string[]>(ogDetails.pronouns);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [query, setQuery] = useState("");
    const [bio, setBio] = useState(ogDetails.bio);

    const inputRef = useRef<HTMLInputElement>(null);
    const suggestions = query
        ? pronounList.filter(p => p.startsWith(query.toLowerCase()) && !pronouns.includes(p))
        : [];

    const addPronoun = (p: string) => {
        setPronouns(prev => [...prev, p]);
        setQuery("");
        setSelectedIndex(0);
    };

    const removePronoun = (p: string) => {
        setPronouns(prev => prev.filter(pr => pr !== p));
    };

    return <>
        <div className={dialogStyles.modal} />
        <div className={`${dialogStyles.dialog} ${dialogStyles.controlledWidth} ${dialogStyles.separatedContent}`}>
            <DialogCloseButton onClick={() => setActive(false)} />
            <div>
                <h2>Edit Profile</h2>
                <main className={styles.main}>
                    <div>
                        <h3>Pronouns</h3>
                        <p>These pronouns will appear next to your profile information. Currently only English pronouns are available.</p>

                        <div className={styles.input} onClick={() => inputRef.current!.click()}>
                            {pronouns.map(p => (
                                <div key={p} className={styles.chip}>
                                    {p} <button onClick={() => removePronoun(p)}>×</button>
                                </div>
                            ))}
                            <input ref={inputRef} className={styles.inputBox} value={query}
                                   onChange={e => setQuery(e.currentTarget.value ?? "")}
                                   onKeyDown={e => {
                                       if (!suggestions.length) return;
                                       if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => (i + 1) % suggestions.length); }
                                       if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => (i - 1 + suggestions.length) % suggestions.length); }
                                       if (e.key === "Tab" || e.key === "Enter") {
                                           e.preventDefault();
                                           addPronoun(suggestions[selectedIndex]!);
                                           setQuery("");
                                       }
                                   }}
                            />
                        </div>

                        {suggestions.length > 0 && (
                            <ul className={styles.suggestions}>
                                {suggestions.map((p, i) => (
                                    <li key={p} style={{ background: i === selectedIndex ? "var(--tri)" : "transparent" }}
                                        onMouseDown={(e) => { e.preventDefault(); addPronoun(p); }}>
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div style={{ marginBlockStart: "1rem" }}>
                        <h3>Bio</h3>
                        <p style={{ marginBlockEnd: "0.5rem" }}>Make good first impressions with your bio.
                            Make it all about you, your interests, and hobbies.</p>
                        <LiveEdit onChange={html => setBio(sanitizeContent(html))} value={bio} mentionHelper />
                    </div>
                </main>
            </div>
            <p style={{ textAlign: "center", marginBlockEnd: 0, width: "100%" }}>
            <Link href="https://account.croomssched.tech/account-center" target="CBSHAccountCenter">
                Manage more in Account Center</Link>
            </p>
            <footer>
                <button onClick={() => void saveSettings(bio, pronouns, ogDetails, sid, newAlert)}>Save</button>
            </footer>
        </div>
    </>;
};

const saveSettings = async (bio: string, pronouns: string[], ogDetails: { bio: string, pronouns: string[] }, sid: string, newAlert: NewAlert) => {
    let hasError = false, hasChanged = false;
    if (bio !== ogDetails.bio) {
        hasChanged = true;
        const r = await fetch(CBSHServerURL + "/users/setProwlerBio", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": JSON.stringify(sid),
            },
            body: JSON.stringify({ bio })
        });

        const res = await r.json() as { status: "OK" | "FAILED", data: any };
        if (res.status !== "OK") {
            newAlert("Error while updating bio", res.data.error, 2);
            hasError = true;
        }
    }

    if (pronouns !== ogDetails.pronouns) {
        hasChanged = true;
        const r = await fetch(CBSHServerURL + "/users/setProwlerPronouns", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": JSON.stringify(sid),
            },
            body: JSON.stringify({ pronouns })
        });

        const res = await r.json() as { status: "OK" | "FAILED", data: any };
        if (res.status !== "OK") {
            newAlert("Error while updating pronouns", res.data.error, 2);
            hasError = true;
        }
    }

    if (!hasError || !hasChanged) window.location.reload();
};