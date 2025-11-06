export default interface Announcement {
    data: AnnouncementData,
    priority: boolean,
    targets: string[],
    created: string,
    expires: string,
    id: string,
}

export interface AnnouncementData {
    title: string,
    message: string,
}