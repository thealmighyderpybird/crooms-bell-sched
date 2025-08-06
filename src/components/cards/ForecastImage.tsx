"use client";

import styles from "./styles/forecastImage.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ForecastImage({ icon }: { icon: string }) {
    const [blob, setBlob] = useState("");

    useEffect(() => {
        fetch(icon).then(r => r.blob())
            .then(r => setBlob(URL.createObjectURL(r)));
    }, []);

    return blob ?
        <Image src={blob} alt="Forecast Icon" width={64} height={64} draggable={false} className={ styles.image }
               onLoad={() => URL.revokeObjectURL(blob)} />
    : null;
};