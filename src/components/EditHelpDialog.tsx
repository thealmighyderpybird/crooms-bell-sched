import DialogCloseButton from "./dialog/DialogCloseButton";
import overlayStyles from "./dialog/dialog.module.css";

export default function EditHelpDialog({ setIsActive }: { setIsActive: (arg0: boolean) => void }) {
    const isLight = document.querySelector("html")!.classList.contains("light");
    const isDark = document.querySelector("html")!.classList.contains("dark");

    const theme = isDark ? "&theme=dark" : (isLight ? "&theme=light" : "");

    return <>
        <div className={overlayStyles.modal} onClick={() => setIsActive(false)} />
        <div className={`${overlayStyles.dialog} ${overlayStyles.controlledWidth} ${overlayStyles.controlledHeight} ${overlayStyles.separatedContent}`}>
            <DialogCloseButton onClick={() => setIsActive(false)} />
            <div>
                <header><h2>LiveEdit Help</h2></header>
                <iframe src={"https://community.croomssched.tech/liveedit/how-to-use?embed=1" + theme} className={overlayStyles.iframeBody}
                        style={{ height: "100%" }} />
            </div>
        </div>
    </>;
}