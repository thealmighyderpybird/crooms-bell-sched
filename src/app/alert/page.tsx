import CardLayout from "~/components/index/CardLayout";
import AlertInfo from "~/app/alert/AlertInfo";
import Card from "~/components/index/Card";

export default async function AlertsPage({ searchParams }: {
    searchParams: Promise<{ id: string | undefined }>
}) {
    const { id } = await searchParams;

    return <CardLayout>
        <Card>
            <AlertInfo alertId={ id } />
        </Card>
    </CardLayout>;
}