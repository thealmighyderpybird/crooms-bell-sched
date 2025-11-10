import styles from "./prowler.module.css";

type TagInfo = {
    name: string;
    description: string;
    image: string;
};

const friendlyTagList: Record<string, TagInfo> = {
    "mod": {
        name: "Moderator",
        description: "This user is a moderator on the Crooms Bell Schedule.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/cop.webp",
    },
    "admin": {
        name: "Admin",
        description: "This user is an admin on the Crooms Bell Schedule.",
        image: "https://img.icons8.com/?size=32&id=nU3xgaV2IKwS"
    },
    "computerScience": {
        name: "Computer Science Club",
        description: "This user is a member of the Computer Science Club.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/comp-sci.png",
    },
    "croomsCon": {
        name: "CroomsCon",
        description: "This user likes CroomsCon.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/croomscon.png",
    },
    "considerThisCow": {
        name: "Cow",
        description: "Consider this cow.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/cow.png",
    },
    "croomsBellSchedule": {
        name: "Crooms Bell Schedule",
        description: "This user likes the Crooms Bell Schedule",
        image: "https://www.croomssched.tech/favicon.ico"
    },
    "derpyBird": {
        name: "Derpy Bird",
        description: "This user likes Tyrax the Destroyer.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/tyrax.png"
    },
    "antiVerified": {
        name: "Antiverified",
        description: "This user has been antiverified.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/antiverified.svg"
    },
    "pride": {
        name: "Pride",
        description: "This user identifies as an LGBTQIA+ member or ally.",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/60/Intersex-inclusive_pride_flag.svg"
    },
    "asexual": {
        name: "Asexual",
        description: "This user identifies as asexual.",
        image: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Asexual_Pride_Flag.svg",
    },
    "bi": {
        name: "Bisexual",
        description: "This user identifies as bisexual.",
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Bisexual_Pride_Flag.svg"
    },
    "gay": {
        name: "Gay",
        description: "This user identifies as gay.",
        image: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Gay_Men_Pride_Flag.svg",
    },
    "intersex": {
        name: "Intersex",
        description: "This user identifies as intersexual.",
        image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Intersex_Pride_Flag.svg",
    },
    "lesbian": {
        name: "Lesbian",
        description: "This user identifies as a lesbian.",
        image: "https://upload.wikimedia.org/wikipedia/commons/f/f8/Lesbian_pride_flag_2018.svg",
    },
    "nonBinary": {
        name: "Nonbinary",
        description: "This user identifies as nonbinary.",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Nonbinary_flag.svg"
    },
    "pan": {
        name: "Pansexual",
        description: "This user identifies as pansexual.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Pansexuality_Pride_Flag.svg"
    },
    "trans": {
        name: "Transgender",
        description: "This user identifies as transgender.",
        image: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Transgender_Pride_flag.svg"
    },
    "croomsConnect": {
        name: "Crooms Connect",
        description: "This user is a Crooms Connect user.",
        image: "https://cdn.croomssched.tech/data/b0e90fd7-e0de-4cba-901b-563f3cc272d0/croomsconnect.png"
    },
};

export default function UserTags({ userTagList }: { userTagList: string[] }) {
    return <div className={ styles.userTagContainer }>{ userTagList?.length > 0 && userTagList.map((tag) =>
        // eslint-disable-next-line @next/next/no-img-element
        <img src={ friendlyTagList[tag]!.image } alt={ friendlyTagList[tag]!.name + " Badge" } width={24} height={24}
             key={ friendlyTagList[tag]!.name.toLowerCase() } title={ friendlyTagList[tag]!.description } />
    )}</div>;
};