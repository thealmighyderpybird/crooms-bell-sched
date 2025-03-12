import loadingStyles from "./root-components/loading.module.css"

export default function Loading() {
    return (<>
        <div className={loadingStyles.container}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style={{shapeRendering: "auto", display: "block", background: "transparent"}}>
                <circle cx="50" cy="50" r="30" strokeWidth="10" strokeLinecap="round" fill="none" style={{stroke: "var(--accent-color)", transition: "none"}}>
                    <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;180 50 50;720 50 50" keyTimes="0;0.5;1"/>
                    <animate attributeName="stroke-dasharray" repeatCount="indefinite" dur="1s" values="18.84955592153876 169.64600329384882;94.2477796076938 94.24777960769377;18.84955592153876 169.64600329384882" keyTimes="0;0.5;1"/>
                </circle>
            </svg>
        </div>
    </>);
}