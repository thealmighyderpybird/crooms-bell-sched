import CroomsBellScheduleLogo from "~/components/CBSHLogo";
import CardLayout from "~/components/index/CardLayout";
import styles from "./layout.module.css";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <div className={ styles.header }>
            <CroomsBellScheduleLogo size={56} />
            <span className={`${styles.dynamicText} ${styles.green}`}>Diversity</span>
            <span className={`${styles.dynamicText} ${styles.red}`}>Equity</span>
            <span className={`${styles.dynamicText} ${styles.blue}`}>Inclusion</span>
        </div>
        { children }
    </CardLayout>;
};