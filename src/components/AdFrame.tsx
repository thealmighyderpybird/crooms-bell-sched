import type { HTMLProps } from "react";

export default function AdFrame(props: HTMLProps<HTMLIFrameElement>) {
    return <iframe src="https://ad.crooms.to" height={175} className="select-none" {...props}></iframe>
};