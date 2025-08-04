import loadingStyles from "~/components/root/loading.module.css";
import RedirectRequester from "./RedirectRequester";
import Spinner from "~/components/Spinner";

export default async function RedirPage({ searchParams }: { searchParams: Promise<{ url: string }> }) {
    const { url } = await searchParams;

    return <div className={ loadingStyles.container }>
        <Spinner size={100} />
        <h1 style={{ fontWeight: "inherit" }}>Loading...</h1>
        <RedirectRequester url={url} />
    </div>;
};