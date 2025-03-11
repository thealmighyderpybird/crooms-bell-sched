import headerStyles from "./header.module.css";
import tools from "~/tabs/tools.json";
let toolsList = ``;

tools.tools.forEach((tool: { id: string; link: string; check: boolean; name: string; }) => {
    // @ts-ignore
    toolsList += `<div tabIndex="1">${tool.name}</div>`;
});

export default function ToolsMenu() {
    return(<div className={headerStyles.subMenu} id={"tools-list"} dangerouslySetInnerHTML={{__html: toolsList}}></div>)
}