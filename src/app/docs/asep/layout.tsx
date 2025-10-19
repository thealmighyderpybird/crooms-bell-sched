import CardLayout from "~/components/index/CardLayout";
import Card from "~/components/index/Card";
import { type ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
    return <CardLayout>
        <Card>
            <h2 style={{ lineHeight: "1" }}>ASEP</h2>
            { children }
        </Card>
    </CardLayout>
};