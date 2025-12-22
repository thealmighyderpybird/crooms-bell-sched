import styles from "./theme.module.css";

export default function ThemeImage({ src, theme }: { src: string, theme: string }) {
        return <img src={src} alt={theme + " Theme"} width={50} height={50} className={ styles.theme } />;
}