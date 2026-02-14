import toys from "~/tabs/toys.json";
import ToyLink from "./ToyLink";

export default function ToysMenu() {
    return <div className="hidden group-hover:block absolute top-12.75 bg-(--pri) overflow-y-auto z-10 transform-[translateX(-.75rem)]"
                style={{ boxShadow: "black 0 10px 10px", maxHeight: "calc(100vh - 90px)" }} id="toys-list">{
        toys.tools.map((tool: { id: string; link: string; popup: boolean; name: string; }, index) =>
            <ToyLink id={tool.id} link={tool.link} name={tool.name} popup={tool.popup} key={`${tool.id}-${index}`} />)
    }</div>;
};