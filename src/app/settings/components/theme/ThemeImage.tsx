export default function ThemeImage({ src, theme }: { src: string, theme: string }) {
        return <img className={`inline-block select-none w-12.5 h-12.5 rounded-lg object-cover${theme === "Pride" ? " object-left" : ""}`}
                    src={src} alt={theme + " Theme"} width={50} height={50} />;
};