import ThemeProvider from "~/components/ThemeProvider";
import CardLayout from "~/components/index/CardLayout";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return <ThemeProvider>
        <CardLayout>
            <div style={{ maxWidth: "480px", margin: "auto", userSelect: "none" }}>
                { children }
            </div>
        </CardLayout>
    </ThemeProvider>
}