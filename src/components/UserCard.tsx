import type User from "~/types/user";

export default function UserCard({ userDetails }: { userDetails: User }) {
    return <div>{ JSON.stringify(userDetails) }</div>
}
