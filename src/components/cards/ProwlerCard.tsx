import SharePostLink from "../cards/SharePostLink";
import CardHeader from "../index/CardHeader";
import type User from "~/types/user";
import Prowler from "~/prowler/root";
import Card from "../index/Card";

export default function ProwlerCard({ sid, uid, userDetails, deviceType, canIPost }: {
    sid: string, uid: string, userDetails: User, deviceType: string, canIPost: boolean | "pending",
}) {
    let classes;
    if (deviceType === "mobile") {
        if (canIPost !== true) classes = " mt-2";
        else classes = "";
    } else {
        if (canIPost !== true) classes = " mt-2 max-h-prowler-no-post";
        else classes = " max-h-prowler";
    }

    return <Card>
        <CardHeader>Prowler</CardHeader>
        <SharePostLink sid={sid} canIPost={canIPost}>Share a post</SharePostLink>
        <div id="prowler-container" className={"overflow-y-auto rounded-lg" + classes}>
            <Prowler sid={sid} uid={uid} session={userDetails} deviceType={deviceType} canIPost={canIPost} />
        </div>
    </Card>
}