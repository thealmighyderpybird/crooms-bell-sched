import CBSHServerURL from "~/lib/CBSHServerURL";
import Verified from "~/components/Verified";
import Link from "next/link";

export default function UserCard({ userData, onMouseLeave }: { userData: {
    username: string, id: string, displayName: string, verified: boolean, croomsPro: boolean, pronouns: string[] // @ts-ignore
}, onMouseLeave?: MouseEvent<HTMLDivElement, MouseEvent> }) {
    /* let pronounString = "";
    userData?.pronouns.forEach((pronoun: string, index: number) => pronounString +=
        pronoun + (index < userData.pronouns.length -1 ? "/" : "")); */

    return <div className="bg-(--pri) rounded-xl box-glow-[black] w-fit" onMouseLeave={onMouseLeave}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://mikhail.croomsbellschedule.com/apiv2/fs/profile_banner/${userData.id}.png`}
             alt={(userData.displayName ? userData.displayName : `@${userData.username}`) + "'s Profile Banner"}
             title={(userData.displayName ? userData.displayName : `@${userData.username}`) + "'s Profile Banner"}
             className="rounded-t-xl aspect-9/5 h-50 pointer-events-none block" draggable="false" />
        <div className="px-4 pt-4 flex flex-row flex-nowrap items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${CBSHServerURL}/users/profile-picture/${userData.id}`}
                 alt={(userData.displayName ? userData.displayName : `@${userData.username}`) + "'s Profile Picture"}
                 title={(userData.displayName ? userData.displayName : `@${userData.username}`) + "'s Profile Picture"}
                 className="rounded-full aspect-square w-13 h-13 pointer-events-none block" draggable="false" />
            <div>
                <h2 className="flex items-center gap-0.5 leading-none max-w-67 overflow-hidden text-ellipsis">
                    { userData.displayName ? userData.displayName : `@${userData.username}` }
                    { userData.verified && <Verified size={16} /> }
                </h2>
                { userData.displayName && <span className="leading-none">@{userData.username}</span> }
            </div>
        </div>
        <div className="mt-4 px-4 pb-4 flex flex-row flex-nowrap gap-1">
            {/*<button className="w-full text-[1rem] leading-none">Follow</button>*/}
            <Link className="button w-full text-[1rem] leading-none text-center"
                  href={`/prowler/${userData.username}`}>View Profile</Link>
        </div>
    </div>;
}
