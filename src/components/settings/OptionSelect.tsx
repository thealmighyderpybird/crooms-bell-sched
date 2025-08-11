import type { HTMLProps, ReactNode } from "react";
import styles from "./option.module.css";

type Props = HTMLProps<HTMLSelectElement> & {
    children?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function OptionSelect({ children, className = "", ...rest }: Props) {
    return <select className={ styles.select } {...rest}>
        { children }
    </select>;
};