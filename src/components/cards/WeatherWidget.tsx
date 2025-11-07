import CardHeader from "~/components/index/CardHeader";
import styles from "./styles/forecastImage.module.css";
import Card from "~/components/index/Card";
import WeatherData from "./WeatherData";
import AlertPanel from "./AlertPanel";

interface ForecastContainer {
    properties: {
        periods: { name: string; icon: string; temperature: number; windSpeed: string; windDirection: string; }[],
    },
}

const sillyQuips = ["server errors", "angry Mikhails", "Dr. Eason", "sharknados", "homework tsunamis",
                            "meatballs", "cloudy", "Landon", "WAPI", "stop reading this"];


export default async function WeatherWidget() {
    const randomNumber = Math.floor(Math.random() * 10);
    try {
        const forecasts = await getWeather();
        return <Card>
            <CardHeader>Weather</CardHeader>
            <AlertPanel/>
            <div className={styles.container}><WeatherData forecasts={forecasts} /></div>
        </Card>
    } catch {
        return <Card>
            <div style={{marginBlockStart: "0.5rem", userSelect: "none"}}>
                <div style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="6rem" height="6rem">
                        <path
                            d="M24 6c-6.29 0-11.45 4.84-11.959 11H11.5a8.5 8.5 0 0 0 0 17h25a8.5 8.5 0 0 0 0-17h-.541C35.45 10.84 30.29 6 24 6"
                            fill="url(#fluentColorCloudDismiss480)"/>
                        <path d="M20 25.5a8.5 8.5 0 1 1-17 0a8.5 8.5 0 0 1 17 0" fillOpacity=".3"
                              fill="url(#fluentColorCloudDismiss481)"/>
                        <path
                            d="M24 30c6.627 0 12-5.373 12-12S30.627 6 24 6c-6.296 0-11.46 4.85-11.96 11.017a8.5 8.5 0 0 1 7.2 12.002C20.7 29.65 22.309 30 24 30"
                            fill="url(#fluentColorCloudDismiss482)" fillOpacity=".3"/>
                        <path
                            fill="url(#fluentColorCloudDismiss485)"
                            d="M24 30c6.627 0 12-5.373 12-12S30.627 6 24 6c-6.296 0-11.46 4.85-11.96 11.017a8.5 8.5 0 0 1 7.2 12.002C20.7 29.65 22.309 30 24 30"
                        />
                        <path
                            fill="url(#fluentColorCloudDismiss486)"
                            fillOpacity=".5"
                            d="M24 6c-6.29 0-11.45 4.84-11.959 11H11.5a8.5 8.5 0 0 0 0 17h25a8.5 8.5 0 0 0 0-17h-.541C35.45 10.84 30.29 6 24 6"
                        />
                        <path
                            fill="url(#fluentColorCloudDismiss487)"
                            fillOpacity=".5"
                            d="M24 6c-6.29 0-11.45 4.84-11.959 11H11.5a8.5 8.5 0 0 0 0 17h25a8.5 8.5 0 0 0 0-17h-.541C35.45 10.84 30.29 6 24 6"
                        />
                        <path
                            fill="url(#fluentColorCloudDismiss483)"
                            d="M45 34c0 6.075-4.925 11-11 11s-11-4.925-11-11s4.925-11 11-11s11 4.925 11 11"
                        />
                        <path
                            fill="url(#fluentColorCloudDismiss484)"
                            d="M39.707 29.707a1 1 0 0 0-1.414-1.414L34 32.586l-4.293-4.293a1 1 0 0 0-1.414 1.414L32.586 34l-4.293 4.293a1 1 0 0 0 1.414 1.414L34 35.414l4.293 4.293a1 1 0 0 0 1.414-1.414L35.414 34z"
                        />
                        <defs>
                            <linearGradient
                                id="fluentColorCloudDismiss480"
                                x1="4.5"
                                x2="22.079"
                                y1="11.25"
                                y2="38.645"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#0FAFFF" />
                                <stop offset="1" stopColor="#367AF2" />
                            </linearGradient>
                            <linearGradient
                                id="fluentColorCloudDismiss481"
                                x1="3"
                                x2="14.46"
                                y1="19.912"
                                y2="30.055"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#fff" />
                                <stop offset="1" stopColor="#FCFCFC" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="fluentColorCloudDismiss482"
                                x1="16.193"
                                x2="19.363"
                                y1="7.35"
                                y2="23.899"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#fff" />
                                <stop offset="1" stopColor="#FCFCFC" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient
                                id="fluentColorCloudDismiss483"
                                x1="26.438"
                                x2="43.167"
                                y1="24.375"
                                y2="48.667"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#F83F54" />
                                <stop offset="1" stopColor="#CA2134" />
                            </linearGradient>
                            <linearGradient
                                id="fluentColorCloudDismiss484"
                                x1="29.431"
                                x2="34.814"
                                y1="34.457"
                                y2="40.055"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#FDFDFD" />
                                <stop offset="1" stopColor="#FECBE6" />
                            </linearGradient>
                            <radialGradient
                                id="fluentColorCloudDismiss485"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientTransform="rotate(-22.883 69.858 -19.237)scale(14.6589 13.0847)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset=".412" stopColor="#2C87F5" />
                                <stop offset="1" stopColor="#2C87F5" stopOpacity="0" />
                            </radialGradient>
                            <radialGradient
                                id="fluentColorCloudDismiss486"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientTransform="matrix(16.18734 31.02285 -230.48087 120.26209 22.25 4.25)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset=".5" stopColor="#DD3CE2" stopOpacity="0" />
                                <stop offset="1" stopColor="#DD3CE2" />
                            </radialGradient>
                            <radialGradient
                                id="fluentColorCloudDismiss487"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientTransform="matrix(0 16.5 -17.0156 0 34 37)"
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop offset=".288" stopColor="#0D1F69" />
                                <stop offset="1" stopColor="#0D1F69" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                    </svg>
                    <h2>Weather Unavailable</h2>
                    <p style={{textAlign: "center"}}>
                        We couldn&apos;t connect to the WAPI, please assume the weather is cloudy with a chance of
                        { " " + sillyQuips[randomNumber] }.
                    </p>
                </div>
            </div>
        </Card>
    }
};

const getWeather = async () => {
    const e = await fetch("https://api.weather.gov/gridpoints/MLB/28,80/forecast");
    const r = await e.json() as ForecastContainer;
    const {periods} = r.properties;
    const forecasts: { dayName: string; icon: string; temp: number; windSpeed: string; windDirection: string; }[] = [];

    let index = 0;
    for (const forecast of periods) {
        forecasts.push({
            dayName: formatName(forecast.name),
            icon: forecast.icon,
            temp: forecast.temperature,
            windSpeed: forecast.windSpeed,
            windDirection: forecast.windDirection,
        });
        index++;
        if (index >= 5) break;
    }

    return forecasts;
};

const formatName = (dayName: string) => {
    if (dayName.startsWith("This")) return dayName.substring(5);
    if (dayName.endsWith(" Night")) return "Night";
    return dayName;
};