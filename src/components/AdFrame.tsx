import type { HTMLProps } from "react";

export default function AdFrame(props: HTMLProps<HTMLIFrameElement>) {
    return <iframe src="https://ad.croomssched.tech" height={175} {...props}></iframe>
};