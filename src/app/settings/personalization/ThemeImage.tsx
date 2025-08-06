"use client";

import { useState, useEffect } from "react";
import styles from "./theme.module.css";
import Image from "next/image";

export default function ThemeImage({ src, theme }: { src: string, theme: string }) {
    const [image, setImage] = useState("");

    useEffect(() => {
        fetch(src)
            .then(res => res.blob())
            .then(blob => setImage(URL.createObjectURL(blob)));
    }, []);

    if (image)
        return <Image src={image} alt={theme + " Theme"} width={50} height={50} className={ styles.theme }
                      onLoad={() => URL.revokeObjectURL(image)} />;
}