export default interface User {
    id: string,
    username: string,
    displayname: string,
    role: "user" | "mod" | "dev" | "admin",
    verified: boolean,
    providers: {
        id: string,
        email: string,
        name: string,
        image: string
    }[],
    userTags: string[],
    croomsPro: boolean,
}