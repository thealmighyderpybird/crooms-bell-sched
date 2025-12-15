import prowlerStyles from "~/prowler/prowler.module.css";
import sanitizeContent from "~/lib/SanitizeContent";
import CBSHServerURL from "~/lib/CBSHServerURL";
import CroomsPro from "~/components/CroomsPro";
import getSession from "~/lib/session.server";
import Verified from "~/components/Verified";
import Card from "~/components/index/Card";
import styles from "./style.module.css";
import ShareButton from "./ShareButton";
import EditButton from "~/app/prowler/[...user]/EditButton";

type UserData = ErrorData & {
    displayname: string,
    username: string,
    verified: boolean,
    croomsPro: boolean,
    pronouns: string[],
    bio: string,
    id: string,
}

interface ErrorData {
    error: string,
    code: string,
}

export default async function UserCard({ username }: { username: string }) {
    const r = await fetch(CBSHServerURL + "/users/" + username);
    const res = await r.json() as { status: "OK" | "FAILED", data: UserData };
    const { uid, sid } = await getSession();
    const userData = res.data;

    if (userData.code === "ERR_USER_NOT_FOUND") {
        return <Card>
        <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", width: "100%", padding: "1rem" }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="10rem" height="10rem">
                <g fill="none">
                    <path fill="url(#fluentColorPerson480)" d="M12.25 28A4.25 4.25 0 0 0 8 32.249V33c0 3.756 1.942 6.567 4.92 8.38C15.85 43.163 19.786 44 24 44s8.15-.837 11.08-2.62C38.058 39.567 40 36.756 40 33v-.751A4.25 4.25 0 0 0 35.75 28z" />
                    <path fill="url(#fluentColorPerson481)" d="M12.25 28A4.25 4.25 0 0 0 8 32.249V33c0 3.756 1.942 6.567 4.92 8.38C15.85 43.163 19.786 44 24 44s8.15-.837 11.08-2.62C38.058 39.567 40 36.756 40 33v-.751A4.25 4.25 0 0 0 35.75 28z" />
                    <path fill="url(#fluentColorPerson482)" d="M24 4c-5.523 0-10 4.477-10 10s4.477 10 10 10s10-4.477 10-10S29.523 4 24 4" />
                    <defs>
                        <linearGradient id="fluentColorPerson480" x1="15.61" x2="20.779" y1="30.127" y2="46.635"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset=".125" stopColor="#9C6CFE"></stop>
                            <stop offset="1" stopColor="#7A41DC"></stop>
                        </linearGradient>
                        <linearGradient id="fluentColorPerson481" x1="24" x2="31.238" y1="26.095" y2="53.143"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#885EDB" stopOpacity="0"></stop>
                            <stop offset="1" stopColor="#E362F8"></stop>
                        </linearGradient>
                        <linearGradient id="fluentColorPerson482" x1="18.756" x2="28.949" y1="6.659" y2="22.934"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset=".125" stopColor="#9C6CFE"></stop>
                            <stop offset="1" stopColor="#7A41DC"></stop>
                        </linearGradient>
                    </defs>
                </g>
            </svg>
            <h2 style={{ userSelect: "none" }}>User not found</h2>
        </div>
        </Card>;
    }

    let pronounString = "";
    userData?.pronouns.forEach((pronoun, index) => pronounString +=
        pronoun + (index < userData.pronouns.length -1 ? "/" : ""));

    return <Card>
        { username && userData?.id ? // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://mikhail.croomssched.tech/apiv2/fs/profile_banner/${userData.id}.png`}
                 alt={ username + "'s profile banner" } title={ username + "'s profile banner" }
                 className={ prowlerStyles.profileBanner + " " + prowlerStyles.userPageBanner } /> : null }
        <div className={ prowlerStyles.corePostHeaderItem } style={{ marginBlockEnd: "0", }}>
            { username && userData?.id ? // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${userData.id}.png`}
                     alt={ username + "'s profile picture" } title={ username + "'s profile picture" }
                     className={ prowlerStyles.profilePicture } width={64} height={64} draggable="false" /> : null }
            <div className={`${prowlerStyles.corePostHeaderContent} ${styles.userContainer} ${styles.header}`}>
                { username &&
                    <div className={ styles.userContainer }>
                        <h2 className={ !userData.displayname && (userData?.verified || userData?.croomsPro) ? prowlerStyles.usernameFlex : undefined }>
                            { userData.displayname ? userData.displayname : `@${username}` }
                            { (!userData.displayname && userData?.verified) && <Verified size={18} /> }
                            { (!userData.displayname && userData?.croomsPro) && <CroomsPro /> }
                        </h2>
                        { userData.displayname && <span className={ prowlerStyles.usernameFlex + " smaller" }>
                            <span>@{username}</span>
                            { userData?.verified && <Verified size={16} /> }
                            { userData.croomsPro && <CroomsPro /> }
                        </span> }
                        { pronounString && <span className={ prowlerStyles.pronouns }>{ pronounString }</span> }
                    </div> }
            </div>
        </div>
        { userData?.bio && <div className={ prowlerStyles.bio } dangerouslySetInnerHTML={{ __html: sanitizeContent(userData.bio) }} /> }
        { uid === userData?.id && <div className={ prowlerStyles.buttonBar }>
            <EditButton pronouns={userData?.pronouns ?? []} bio={userData?.bio ?? ""} sid={sid} />
            <ShareButton username={username} displayName={userData.displayname} />
        </div> }
    </Card>;
}