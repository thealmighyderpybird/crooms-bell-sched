import type { HTMLProps, ReactNode } from "react";
import styles from "./option.module.css";

type Props = HTMLProps<HTMLSelectElement> & {
    children?: ReactNode;
};

export default function OptionSelect({ children, className = "", ...rest }: Props) {
    return <select className={ styles.select } {...rest}>
        { children }
    </select>;
};