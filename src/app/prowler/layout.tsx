import ThemeProvider from "~/components/ThemeProvider";
import CardLayout from "~/components/index/CardLayout";
import type { ReactNode } from "react";

export default function ProwlerLayout({ children }: { children: ReactNode }) {
    return <ThemeProvider><CardLayout>{ children }</CardLayout></ThemeProvider>;
};