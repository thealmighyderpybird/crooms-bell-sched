import styles from "../tool/[toolId]/toolFrame.module.css";
import ThemeProvider from "~/components/ThemeProvider";

export default function DailyPoll() {
    return <ThemeProvider>
        <iframe className={ styles.tool } src="/tool/poll"></iframe>
    </ThemeProvider>
};