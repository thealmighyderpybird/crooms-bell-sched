import headerStyles from "./header.module.css";
import toys from "~/tabs/toys.json";
let toysList = ``;

toys.tools.forEach((tool: { id: string; link: string; check: boolean; name: string; }) => {
    // @ts-ignore
    toysList += `<div tabIndex="1">${tool.name}</div>`;
});

export default function ToysMenu() {
    return(<div className={headerStyles.subMenu} id={"toys-menu"} dangerouslySetInnerHTML={{__html: toysList}}></div>);
}