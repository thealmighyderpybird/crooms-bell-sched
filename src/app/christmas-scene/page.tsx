/**
 * __It's just snow...__
 *
 * Hope this shuts you up about a server in the network corner, mom.
 */
import { Snowfall } from "@namnguyenthanhwork/react-snowfall-effect";
import styles from "./styles.module.css";

export default function ChristmasScene() {
    return <div className={ styles.root }>
        <Snowfall snowflakeCount={150} fps={60} fadeEdges={true} gravity={1} snowflakeShape="dot" />
    </div>
};