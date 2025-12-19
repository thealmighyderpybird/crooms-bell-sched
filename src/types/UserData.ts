export type UserData = ErrorData & {
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