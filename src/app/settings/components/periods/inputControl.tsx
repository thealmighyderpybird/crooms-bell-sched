import styles from "./input.module.css";
import type { HTMLProps } from "react";

type Props = HTMLProps<HTMLInputElement> & {
    inputName: string;
    inputId: string;
};

export default function PeriodNames({ inputId, inputName, ...rest }: Props) {
    return <div className={styles.inputContainer}>
        <label htmlFor={inputId}>{inputName}:</label>
        <input name={inputId} id={inputId} placeholder={inputName} type="text" className={styles.input} {...rest} />
    </div>;
};