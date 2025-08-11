import loadingStyles from "../components/root/loading.module.css"
import Spinner from "~/components/Spinner";

export default function Loading() {
    return <div className={loadingStyles.container}><Spinner /></div>;
}