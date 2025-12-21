export default interface Post {
    id: string;
    uid: string;
    data: string;
    store: string;
    create: string;
    createdBy: string;
    verified: boolean;
    userTags: string[];
    pronouns: string[];
    displayName: string;
}