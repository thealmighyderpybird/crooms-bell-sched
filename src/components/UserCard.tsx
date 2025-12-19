import styles from "~/app/prowler/[...user]/style.module.css";
import prowlerStyles from "~/prowler/prowler.module.css";
import CroomsPro from "~/components/CroomsPro";
import Verified from "~/components/Verified";

export default function UserCard({ userData }: { userData: {
    username: string, id: string, displayName: string, verified: boolean, croomsPro: boolean, pronouns: string[]
} }) {
    let pronounString = "";
    userData?.pronouns.forEach((pronoun: string, index: number) => pronounString +=
        pronoun + (index < userData.pronouns.length -1 ? "/" : ""));

    return <div className={ prowlerStyles.corePostHeaderItem } style={{ marginBlockEnd: "0" }}>
        { userData?.username && userData?.id ? // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://mikhail.croomssched.tech/apiv2/fs/pfp/${userData.id}.png`}
                 alt={ userData.username + "'s profile picture" } title={ userData.username + "'s profile picture" }
                 className={ prowlerStyles.profilePicture } width={64} height={64} draggable="false" /> : null }
        <div className={`${prowlerStyles.corePostHeaderContent} ${styles.userContainer} ${styles.header}`}>
            { userData?.username &&
                <div className={ styles.userContainer }>
                    <h2 className={ !userData.displayName && (userData?.verified || userData?.croomsPro) ? prowlerStyles.usernameFlex : undefined }>
                        { userData.displayName ? userData.displayName : `@${userData.username}` }
                        { (!userData.displayName && userData?.verified) && <Verified size={18} /> }
                        { (!userData.displayName && userData?.croomsPro) && <CroomsPro /> }
                    </h2>
                    { userData.displayName && <span className={ prowlerStyles.usernameFlex + " smaller" }>
                        <span>@{userData.username}</span>
                        { userData?.verified && <Verified size={16} /> }
                        { userData.croomsPro && <CroomsPro /> }
                    </span> }
                    { pronounString && <span className={ prowlerStyles.pronouns }>{ pronounString }</span> }
                </div> }
        </div>
    </div>;
}
