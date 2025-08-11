import styles from "./toolFrame.module.css";
import tools from "~/tabs/tools.json";

export default async function Page({ params }: { params: Promise<{ toolId: string }> }) {
    const { toolId } = await params;
    const tool = tools.tools.find(item => item.id === toolId);
    return <iframe src={ tool!.link } className={ styles.tool }></iframe>;
};