import styles from "../../tool/[toolId]/toolFrame.module.css";
import toys from "~/tabs/toys.json";

export default async function Page({ params }: { params: Promise<{ toyId: string }> }) {
    const { toyId } = await params;
    const tool = toys.tools.find(item => item.id === toyId);
    return <iframe src={ tool!.link } className={ styles.tool }></iframe>;
};