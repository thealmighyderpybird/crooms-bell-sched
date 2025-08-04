import headerStyles from "./header.module.css";
import toys from "~/tabs/toys.json";
import ToyLink from "./ToyLink";

export default function ToolsMenu() {
    return <div className={headerStyles.subMenu} id="tools-list">{
        toys.tools.map((tool: { id: string; link: string; popup: boolean; name: string; }, index) =>
            <ToyLink id={tool.id} link={tool.link} name={tool.name} popup={tool.popup} key={`${tool.id}-${index}`} />)
    }</div>;
};