import type { DataType } from "csstype";

export default function ActionBadge({ color, number }: { color: DataType.Color | "accent-color", number?: number }) {
    return <div style={ color !== "accent-color" ? { backgroundColor: color } : undefined }
                className={"select-none leading-4 text-xs rounded-full min-h-4 text-center "
                + (number ? (number.toString().length > 1 ? "px-1 aspect-6/5" : "px-1.5 aspect-square") : "px-2 aspect-square")
                + (color === "accent-color" ? " bg-(--accent-color)" : "")}>{number}</div>;
};