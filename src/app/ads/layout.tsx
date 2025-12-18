import CroomsBellScheduleLogo from "~/components/CBSHLogo";
import CardLayout from "~/components/index/CardLayout";
import styles from "./layout.module.css";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <div className={ styles.header }>
            <CroomsBellScheduleLogo size={56} />
            <h1 className={ styles.dynamicText }>Ads</h1>
        </div>
        { children }
    </CardLayout>;
};