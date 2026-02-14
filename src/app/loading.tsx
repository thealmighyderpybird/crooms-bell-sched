import Spinner from "~/components/Spinner";

export default function Loading() {
    return <div className="flex flex-col justify-center items-center max-w-25 mx-auto select-none"
                style={{ height: "calc(100vh - 84px)" }}><Spinner /></div>;
}