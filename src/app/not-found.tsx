import errorStyles from "../components/root/error.module.css";

export default function NotFound() {
    return (
        <div className={errorStyles.container}>
            <img src="./images/clippy.png" draggable="false" alt="Clippy"/>
            <h1>It looks like you're lost!</h1>
            <h3>Would you like some help?</h3>
            <a className={errorStyles.button + " button"} href="/">Go back to the homepage</a>
        </div>
    )
}