import styles from "../styles.module.css";

export default function PollPageError() {
    return <div className={ styles.pollLoader }>
        <div className={ styles.container }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="8rem" height="8rem">
                <g fill="none">
                    <path d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
                          fill="url(#fluentColorCalendarCheckmark240)" />
                    <path d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
                          fill="url(#fluentColorCalendarCheckmark241)" />
                    <path d="M21 7.5v10.25A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V7.5l9-1z"
                          fill="url(#fluentColorCalendarCheckmark245)" fillOpacity=".3" />
                    <path d="M17.75 3A3.25 3.25 0 0 1 21 6.25V8H3V6.25A3.25 3.25 0 0 1 6.25 3z"
                          fill="url(#fluentColorCalendarCheckmark242)" />
                    <path d="M17.5 12a5.5 5.5 0 1 1 0 11a5.5 5.5 0 0 1 0-11"
                          fill="url(#fluentColorCalendarCheckmark243)" />
                    <path d="M20.854 15.146a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708l1.646 1.647l3.646-3.647a.5.5 0 0 1 .708 0"
                          fill="url(#fluentColorCalendarCheckmark244)" fillRule="evenodd" clipRule="evenodd" />
                    <defs>
                        <linearGradient id="fluentColorCalendarCheckmark240" gradientUnits="userSpaceOnUse"
                                        x1="9.429" x2="14.137" y1="6.5" y2="20.932">
                            <stop stopColor="#B3E0FF" />
                            <stop offset="1" stopColor="#8CD0FF" />
                        </linearGradient>
                        <linearGradient id="fluentColorCalendarCheckmark241" gradientUnits="userSpaceOnUse"
                                        x1="13.929" x2="16.625" y1="12.432" y2="24.267">
                            <stop stopColor="#DCF8FF" stopOpacity="0" />
                            <stop offset="1" stopColor="#FF6CE8" stopOpacity=".7" />
                        </linearGradient>
                        <linearGradient id="fluentColorCalendarCheckmark242" gradientUnits="userSpaceOnUse"
                                        x1="3.723" x2="5.356" y1="3" y2="11.537">
                            <stop stopColor="#0094F0" />
                            <stop offset="1" stopColor="#2764E7" />
                        </linearGradient>
                        <linearGradient id="fluentColorCalendarCheckmark243" gradientUnits="userSpaceOnUse"
                                        x1="12.393" x2="19.984" y1="14.063" y2="21.95">
                            <stop stopColor="#52D17C" />
                            <stop offset="1" stopColor="#22918B" />
                        </linearGradient>
                        <linearGradient id="fluentColorCalendarCheckmark244" gradientUnits="userSpaceOnUse"
                                        x1="15.313" x2="16.45" y1="15.51" y2="21.13">
                            <stop stopColor="#fff" />
                            <stop offset="1" stopColor="#E3FFD9" />
                        </linearGradient>
                        <radialGradient id="fluentColorCalendarCheckmark245" cx="0" cy="0" r="1"
                                        gradientTransform="matrix(0 8.56818 -8.35714 0 17.786 19.023)"
                                        gradientUnits="userSpaceOnUse">
                            <stop offset=".535" stopColor="#4A43CB" />
                            <stop offset="1" stopColor="#4A43CB" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </g>
            </svg>
            <h3 className={ styles.header }>The Daily Poll is open!</h3>
            <p className={ styles.content }>
                The Daily Poll has opened in a new window.
            </p>
            <p className={ styles.small }>
                If you can&apos;t see the Daily Poll, please make sure popups are enabled.
                Otherwise, click &quot;Daily Poll&quot; again.
            </p>
        </div>
    </div>;
};