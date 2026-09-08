import CardLayout from '~/components/index/CardLayout';
import ThemeProvider from '~/components/ThemeProvider';
import AlertInfo from '~/app/alert/AlertInfo';
import Card from '~/components/index/Card';
import { notFound } from 'next/navigation';

export default async function AlertsPage({ searchParams }: { searchParams: Promise<{ id: string | undefined }> }) {
    const { id } = await searchParams;

    if (!id) notFound();
    try {
        const r = await fetch(`https://api.weather.gov/alerts/${id}`);
        const res = await r.json();

        return <ThemeProvider>
            <CardLayout>
                <Card>
                    <AlertInfo alertInfo={res.properties} />
                </Card>
            </CardLayout>
        </ThemeProvider>;
    } catch {notFound()}
}