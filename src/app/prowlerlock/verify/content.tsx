"use client"

import CBSHServerURL from "~/lib/CBSHServerURL";
import { useState } from "react";
import Link from "next/link";

export default function VerificationWizard({ sid }: { sid: string }) {
    const [standardsCheck, setStandardsCheck] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [scpsId, setScpsId] = useState("");
    const [error, setError] = useState("");

    const pages = [
        <>
            <h2 className="text-3xl font-bold">Verification Wizard</h2>
            <p className="">Welcome to the ProwlerLock Basic Verification Wizard. During this process,
                you will identify your account with your school account, and request for access to Prowler.</p>
            <p className=" mt-5">This process should take no longer than 5 minutes. However, approval times
                may be between an hour and 3 days.</p>
            <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
                <button className="min-w-28 text-[1rem] transition" onClick={() => setCurrentPage(1)}>Start</button>
            </div>
        </>, <>
            <h2 className="text-3xl font-bold">Community Standards</h2>
            <p className=" mb-5">Please review the Crooms Bell Schedule Community Standards and agree to
                follow them.</p>
            <div className="text-center">
                <button onClick={() => window.open("https://community.croomssched.tech/standards",
                    "CBSH_CommunityStandards", "status=0, width=500, height=800")}
                        className="min-w-28 text-[1rem] transition"> View Community Standards</button>
            </div>
            <div className="flex flex-row gap-2.5 mt-5 items-start">
                <input id="communityStandards" type="checkbox" checked={standardsCheck} className="mt-0.25 w-5 h-5"
                       onChange={(e) => setStandardsCheck(e.currentTarget.checked)} />
                <label htmlFor="communityStandards" className="">I have reviewed and understand that these
                    rules apply whenever I am using Prowler or any other Crooms Bell Schedule Social Platform. If I
                    don&apos;t follow these standards, my posts may be removed and/or my account will be banned.</label>
            </div>
            <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
                <button onClick={() => setCurrentPage(0)} className="min-w-28 text-[1rem] transition">
                    Back</button>
                <button onClick={() => setCurrentPage(2)} className="min-w-28 text-[1rem] transition"
                        disabled={!standardsCheck}>Next</button>
            </div>
        </>, <>
            <h2 className="text-3xl font-bold">School Account Identification</h2>
            <p className="">To continue, please enter your SCPS ID number.</p>
            <label htmlFor="scpsId" className="hidden">SCPS ID Number</label>
            <input className="w-full mt-5 mb-1 outline-none border-b-2 border-b-(--tri) hover:border-b-(--qua)
             focus:border-b-(--accent-color) text-left"
                   onKeyDown={(e) => {
                       if (e.key === "Enter" && isValidId(scpsId)) setCurrentPage(2);}}
                   placeholder="SCPS ID Number" autoComplete="off" autoCorrect="off" id="scpsId"
                   value={scpsId} onChange={(e) => setScpsId(e.currentTarget.value)} />
            <p className="leading-none text-xs">*If you are a teacher or want to waive this requirement,
                please <Link href="mailto:support@croomssched.tech"
                             className="underline hover:no-underline">email support</Link>.
            </p>
            { error && <p className="mt-2.5 text-sm text-yellow-600 dark:text-yellow-400">{error}</p> }
            <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
                <button onClick={() => setCurrentPage(1)} className="min-w-28 text-[1rem] transition">
                    Back</button>
                <button onClick={() => submitUserDetails(sid, scpsId, setError, setCurrentPage)}
                        className="min-w-28 text-[1rem] transition" disabled={!isValidId(scpsId)}>Finish</button>
            </div>
        </>, <>
            <h2 className="text-3xl font-bold">Verification Complete!</h2>
            <p className=" mb-2.5">Your request has been sent. Requests are processed within an hour to 3 days.</p>
            <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
                <button onClick={() => history.back()} className="min-w-28 text-[1rem] transition">
                    Return to Previous Page</button>
            </div>
        </>, <>
            <h2 className="text-3xl font-bold">Verification Complete!</h2>
            <p className=" mb-2.5">Your request has been approved. You should now be able to post on Prowler.</p>
            <div className="absolute mt-10 bottom-5 flex justify-end gap-1" style={{ width: "calc(100% - 2.5rem)" }}>
                <button onClick={() => history.back()} className="min-w-28 text-[1rem] transition">
                    Return to Previous Page</button>
            </div>
        </>
    ];

    return pages[currentPage];
};

const isValidId = (id: string) => /^59[2-3][0-9]{7}$/.test(id);

const submitUserDetails = async (sid: string, scpsId: string,
                                 setError: (error: string) => void, setPage: (page: number) => void) => {
    const r = await fetch(CBSHServerURL + "/users/setProwlerInfo", {
        headers: {
            "Authorization": JSON.stringify(sid),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ scpsId: scpsId }),
        method: "POST",
    });
    const res = await r.json() as { status: "OK" | "FAILED", data: {
        allowed: boolean,
        error: string,
    }};

    if (res.status !== "OK") setError(res.data.error);
    if (res.data.allowed) setPage(4);
    else setPage(3);
};