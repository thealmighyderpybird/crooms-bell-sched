"use client";

import type { CBSHUser } from "~/lib/getSessionInfo";
import styles from "./accountHeader.module.css";
import { eventSignOut } from "~/lib/ssrSession";
import headerStyles from "./header.module.css";
import Verified from "~/components/Verified";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function AccountHeader({ session }: { session: CBSHUser | null }) {
    const [isTrayOpen, setIsTrayOpen] = useState(false);
    const router = useRouter();

    if (session === null) return <div className={`${headerStyles.menuItem} ${styles.accountButton}`}
                                      onClick={() => {router.push("/auth/login")}}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/null.png`}
             alt="Profile Picture" className={ styles.profilePicture } />
        <div className={ styles.accountDetails }>Sign In</div>
    </div>

    return <>
        <div className={`${headerStyles.menuItem} ${styles.accountButton}`}
             onClick={() => setIsTrayOpen(toggleIsTrayOpen(isTrayOpen))}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${session.id}.png`}
                 alt={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                 title={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                 className={ styles.profilePicture } />
            <div className={ styles.accountDetails }>
                { session.displayname !== "" ? session.displayname : `@${session.username}` }
                { session.verified && <Verified size={15} /> }
            </div>
        </div>
        { isTrayOpen && <div className={ styles.accountPopout }>
            <div className={ styles.accountPopoutCard }>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${session.id}.png`}
                     alt={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                     title={ (session.displayname ? session.displayname : `@${session.username}`) + "'s Profile Picture"}
                     className={ styles.profilePicture } />
                <div>
                    <h2>
                        { session.displayname ? session.displayname : `@${session.username}` }
                        { session.verified && <Verified size={16} /> }
                    </h2>
                    { session.displayname && <span> @{session.username}</span> }
                </div>
            </div>
            <div className={ styles.links }>
                <Link href="https://account.croomssched.tech/account-center"
                      target="CBSHAccountCenter">Manage your account</Link>
                <Link href="#" onClick={() => {
                    void eventSignOut();
                    router.refresh();
                }}>Sign out</Link>
            </div>
        </div> }
    </>
};

const toggleIsTrayOpen = (isTrayOpen: boolean) => !isTrayOpen;