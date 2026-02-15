import type Announcement from "~/types/Announcement";
import sanitizeContent from "~/lib/SanitizeContent";
import Accordion from "~/components/Accordion";
import { parseTime } from "~/lib/parseEndTime";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
    "October", "November", "December"];

export default function Announcement({ announcement }: { announcement: Announcement }) {
    const createdDate = new Date(announcement.created);
    const expiresData = new Date(announcement.expires);

    const createTime = `${months[createdDate.getMonth()]} ${createdDate.getDate()}, ${createdDate.getFullYear()} ` +
        parseTime(createdDate)

    const expiresTime = `${months[expiresData.getMonth()]} ${expiresData.getDate()}, ${expiresData.getFullYear()} ` +
        parseTime(expiresData)

    return <Accordion title={ announcement.data.title }>
        <div dangerouslySetInnerHTML={{ __html: sanitizeContent(announcement.data.message) }} />
        <div className="mt-4 text-[.7rem] flex items-center group">
            <span className="leading-none">{createTime}</span>
            { announcement.priority && <div title="This announcement is a Priority Announcement">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1.125rem" height="1.125rem"
                     className="fill-(--alert) block priority">
                <path d="M5.96 4.457a2.075 2.075 0 1 1 4.08 0l-.856 4.56a1.205 1.205 0 0 1-2.368 0zM9.5 12.5a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0" />
            </svg></div> }
            { announcement.expires !== "false" && <div title={"This announcement expires at " + expiresTime}
                                                       className="group-[:not(:has(.priority))]:ml-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1.125rem" height="1.125rem"
                     className="fill-(--main) block">
                    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M8 4.5V8h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 1 0" />
                </svg></div> }
        </div>
    </Accordion>
};