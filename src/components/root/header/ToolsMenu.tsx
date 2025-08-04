import headerStyles from "./header.module.css";
import tools from "~/tabs/tools.json";
import ToolLink from "./ToolLink";

export default function ToolsMenu() {
    return <div className={headerStyles.subMenu} id="tools-list">{
        tools.tools.map((tool: { id: string; link: string; popup: boolean; name: string; }, index) =>
            <ToolLink id={tool.id} link={tool.link} name={tool.name} popup={tool.popup} key={`${tool.id}-${index}`} />)
    }</div>;
};