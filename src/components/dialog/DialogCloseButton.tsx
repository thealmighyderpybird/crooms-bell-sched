import type { SVGProps, ReactNode } from "react";
import styles from "./dialog.module.css";

type Props = SVGProps<SVGSVGElement> & {
    children?: ReactNode;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DialogCloseButton({ children, className = styles.closeButton, ...props }: Props) {
    return <svg className={ styles.closeButton } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
        <path d="M8.56 6.44a1.5 1.5 0 1 0-2.12 2.12L21.878 24L6.439 39.44a1.5 1.5 0 1 0 2.122 2.12L24 26.121L39.439 41.56a1.5 1.5 0 1 0 2.12-2.121L26.122 24l15.44-15.439A1.5 1.5 0 1 0 39.44 6.44L24 21.879z"
              fill="currentColor" />
    </svg>;
};