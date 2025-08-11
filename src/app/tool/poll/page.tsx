import PollClientSideRedirTool from "./Redir";
import Spinner from "~/components/Spinner";
import styles from "./styles.module.css";

export default function PollTool() {
    return <div className={ styles.pollLoader }>
        <div className={ styles.container }>
            <Spinner size={100} />
            <h3 className={ styles.header }>Loading Daily Poll...</h3>
            <p className={ styles.content }>Impatient? Take a nap. Get a life. Do something else!</p>
            <p className={ styles.content + " " + styles.small }>
                Quick tip: Sign in to Google Drive before you open the Daily Poll, and allow third-party cookies.
            </p>
        </div>
        <PollClientSideRedirTool />
    </div>;
};