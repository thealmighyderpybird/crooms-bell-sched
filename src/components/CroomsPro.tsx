import CroomsProImg from "./croomspro.png";
import Image from "next/image";

export default function CroomsPro() {
    return <Image src={CroomsProImg.src} alt="CroomsPro" style={{ marginInlineStart: "0.5rem", borderRadius: "0.25rem" }}
                  height={16} width={40} draggable="false" />;
};