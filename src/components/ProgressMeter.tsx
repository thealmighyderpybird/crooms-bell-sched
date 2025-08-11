import styles from "./progressMeter.module.css";

export default function ProgressMeter({ progress }: { progress: number }) {
    return <div className={ styles.progressMeter }>
        <div className={ styles.progressMeterBar } style={{ width: progress + "%" }} />
    </div>
};