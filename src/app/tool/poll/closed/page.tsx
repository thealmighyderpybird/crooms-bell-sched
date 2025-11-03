import styles from "../styles.module.css";

export default function PollPageError() {
    return <div className={ styles.pollLoader }>
        <div className={ styles.container }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="8rem" height="8rem">
                <g fill="none">
                    <path d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4"
                          fill="url(#fluentColorErrorCircle480)"></path>
                    <path d="M24 13c.69 0 1.25.56 1.25 1.25v12.5a1.25 1.25 0 1 1-2.5 0v-12.5c0-.69.56-1.25 1.25-1.25m0 21a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                            fill="url(#fluentColorErrorCircle481)"></path>
                    <defs>
                        <linearGradient id="fluentColorErrorCircle480" x1="10.25" x2="36.5" y1="-2.25" y2="47.75"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FF0F0F"></stop>
                            <stop offset="1" stopColor="#8F0101"></stop>
                        </linearGradient>
                        <linearGradient id="fluentColorErrorCircle481" x1="18.667" x2="29.067" y1="13" y2="34.131"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#B4B4B4"></stop>
                            <stop offset="1" stopColor="#F1F1F1"></stop>
                        </linearGradient>
                    </defs>
                </g>
            </svg>
            <h3 className={ styles.header }>The Daily Poll is closed.</h3>
            <p className={ styles.content }>Please check back later.</p>
            <p className={ styles.small }>
                Please check your surroundings to ensure there is no Suvan in the area.
            </p>
        </div>
    </div>;
};