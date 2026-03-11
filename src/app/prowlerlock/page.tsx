import CBSHServerURL from "~/lib/CBSHServerURL";
import getSession from "~/lib/session.server";
import Link from "next/link";

export default async function Page() {
    const {sid} = await getSession();
    const {data} = await (await fetch(CBSHServerURL + "/feed/can-i-post", {
        headers: {"Authorization": JSON.stringify(sid)}, method: "POST",
    })).json() as { status: "OK" | "FAILED", data: boolean | "pending" };

    return <div className="container mx-auto my-10">
        <div className="bg-(--pri) mx-5 p-5 rounded-2xl box-glow-[black]">
            <h1 className="leading-none select-none mb-5!">ProwlerLock</h1>
            {data === false ?
                <div className="flex gap-5 select-none">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 40 40" width="7.5rem" height="7.5rem">
                        <g fill="none">
                            <path d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
                                  fill="url(#fluentColorErrorCircle480)"/>
                            <path
                                d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                                fill="url(#fluentColorErrorCircle481)"/>
                            <defs>
                                <linearGradient id="fluentColorErrorCircle480" gradientUnits="userSpaceOnUse"
                                                x1="10.25" x2="36.5" y1="-2.25" y2="47.75">
                                    <stop stopColor="#FFCD0F"></stop>
                                    <stop offset="1" stopColor="#FE8401"></stop>
                                </linearGradient>
                                <linearGradient id="fluentColorErrorCircle481" gradientUnits="userSpaceOnUse"
                                                x1="18.667" x2="29.067" y1="13" y2="34.131">
                                    <stop stopColor="#4A4A4A"></stop>
                                    <stop offset="1" stopColor="#212121"></stop>
                                </linearGradient>
                            </defs>
                        </g>
                    </svg>
                    <div className="flex flex-col justify-center">
                        <h2 className="override-header-[white]">You are not allowed to use Prowler</h2>
                        <p>If you want to post, you need to complete <Link href="/prowlerlock/verify">
                            ProwlerLock Basic Verification</Link>.</p>
                        <p className="mb-0">To waive these requirements, please contact Andrew or <Link
                            href="mailto:support@croomssched.tech">our support email</Link>.</p>
                    </div>
                </div> : <>{data === true ?
                    <div className="flex gap-5">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 16 16" width="7.5rem" height="7.5rem">
                            <g fill="none">
                                <path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                                      fill="url(#ic_fluent_checkmark_circle_20_color__a)"/>
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M13.35 7.65c.2.2.2.5 0 .7l-4 4a.5.5 0 0 1-.7 0l-2-2a.5.5 0 0 1 .7-.7L9 11.29l3.65-3.64c.2-.2.5-.2.7 0Z"
                                      fill="url(#ic_fluent_checkmark_circle_20_color__b)"/>
                                <defs>
                                    <linearGradient id="ic_fluent_checkmark_circle_20_color__a" x1="2.57" y1="5"
                                                    x2="13.61" y2="16.47" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#52D17C"/>
                                        <stop offset="1" stop-color="#22918B"/>
                                    </linearGradient>
                                    <linearGradient id="ic_fluent_checkmark_circle_20_color__b" x1="7.81" y1="8.01"
                                                    x2="8.95" y2="13.63" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fff"/>
                                        <stop offset="1" stop-color="#E3FFD9"/>
                                    </linearGradient>
                                </defs>
                            </g>
                        </svg>
                        <div className="flex flex-col justify-center">
                            <h2 className="override-header-[white]">You are allowed to use Prowler</h2>
                            <p>You currently can post on the <Link href="/prowler">Prowler</Link> page.</p>
                            <p className="mb-0">Make sure you follow the <Link
                                href="https://community.croomssched.tech/standards"
                                target="CBSH_CommunityStandards">Community Standards</Link> when posting.</p>
                        </div>
                    </div> : <div className="flex gap-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="4 4 40 40" width="7.5rem" height="7.5rem">
                            <g fill="none">
                                <path fill="url(#SVGzSvjBcJg)"
                                      d="M24 5c10.493 0 19 8.507 19 19s-8.507 19-19 19S5 34.493 5 24S13.507 5 24 5"/>
                                <path fill="url(#SVGCyaRlWmK)"
                                      d="M22.75 12c.647 0 1.18.492 1.244 1.122l.006.128V24h6.75a1.25 1.25 0 0 1 .128 2.494l-.128.006h-8a1.25 1.25 0 0 1-1.244-1.122l-.006-.128v-12c0-.69.56-1.25 1.25-1.25"/>
                                <defs>
                                    <linearGradient id="SVGzSvjBcJg" x1="11.333" x2="30.333" y1="2.889" y2="45.111"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#1ec8b0"/>
                                        <stop offset="1" stop-color="#2764e7"/>
                                    </linearGradient>
                                    <linearGradient id="SVGCyaRlWmK" x1="22.419" x2="18.569" y1="14.219" y2="25.686"
                                                    gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#fdfdfd"/>
                                        <stop offset="1" stop-color="#d1d1ff"/>
                                    </linearGradient>
                                </defs>
                            </g>
                        </svg>
                        <div className="flex flex-col justify-center">
                            <h2 className="override-header-[white]">You are not allowed to use Prowler</h2>
                            <p>You have already submitted your Basic Verification.
                                Please wait for an admin to review your information.
                                This process may take up to 5 days, however it is usually shorter.
                            </p>
                            <p className="mb-0">To waive these requirements, please contact Andrew or <Link
                                href="mailto:support@croomssched.tech">our support email</Link>.</p>
                        </div>
                    </div>
                }</>}
        </div>
    </div>
};