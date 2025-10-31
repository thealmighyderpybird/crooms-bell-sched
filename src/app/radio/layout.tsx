import CardLayout from "~/components/index/CardLayout";
import styles from "./styles.module.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Radio"
};

export default function RadioLayout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <div className={ styles.cardRoot }>
            <div className={ styles.radioHeader }>
                <Image src="/favicon.ico" alt="Logo" draggable="false" width={54} height={54} priority={true} />
                <div>
                    <span>Crooms Bell Schedule</span>
                    <span>Radio Streaming</span>
                </div>
            </div>
            <div className={ styles.cardContent }>{ children }</div>
        </div>
    </CardLayout>
};