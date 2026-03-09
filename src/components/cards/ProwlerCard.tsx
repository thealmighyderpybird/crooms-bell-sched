import SharePostLink from "../cards/SharePostLink";
import CardHeader from "../index/CardHeader";
import type User from "~/types/user";
import Prowler from "~/prowler/root";
import Card from "../index/Card";

export default function ProwlerCard({ sid, uid, userDetails, deviceType, canIPost }: {
    sid: string, uid: string, userDetails: User, deviceType: string, canIPost: boolean,
}) {
    return <Card>
        <CardHeader>Prowler</CardHeader>
        <SharePostLink sid={sid} canIPost={canIPost}>Share a post</SharePostLink>
        <div id="prowler-container" className={(deviceType === "mobile" ? "" : "lg:max-h-prowler ") + "overflow-y-auto rounded-lg"}>
            <Prowler sid={sid} uid={uid} session={userDetails} deviceType={deviceType} />
        </div>
    </Card>
}