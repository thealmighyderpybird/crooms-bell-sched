import CroomsProImg from "./croomspro.png";
import Image from "next/image";

export default function CroomsPro() {
    return <Image src={CroomsProImg.src} alt="CroomsPro" height={16} width={40} draggable="false"
                  style={{ marginInlineStart: "0.5rem", borderRadius: "0.25rem", pointerEvents: "none" }} />;
};