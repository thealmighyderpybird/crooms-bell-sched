import Image from "next/image";

export default function CroomsBellScheduleLogo(props: { size: 32 | 48 | 56 | 64 | 72 | 96 | 108 | 144 }) {
    return <div style={{ userSelect: "none", display: "flex", gap: "0.25rem", justifyContent: "start",
                         flexFlow: "row nowrap", alignItems: "center" }}>
        <Image src={`/logo/${props.size}.png`} alt="Crooms Bell Schedule Logo" width={props.size} height={props.size}
               draggable="false" priority />
        <span style={{ fontSize: `${props.size * 0.5625}px`, lineHeight: "1rem", fontWeight: 900, letterSpacing: "0" }}>
            Crooms Bell Schedule</span>
    </div>;
};