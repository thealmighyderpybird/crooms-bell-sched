import CardHeader from "~/components/index/CardHeader";
import styles from "./styles/forecastImage.module.css";
import ForecastImage from "./ForecastImage";
import Card from "~/components/index/Card";
import AlertPanel from "./AlertPanel";

export default async function WeatherWidget() {
    const forecasts = await getWeather();
    return <Card>
        <CardHeader>Weather</CardHeader>
        <AlertPanel />
        <div className={ styles.container }>
        { forecasts.map((forecast, index) => {
            return <div className={ styles.content } key={index}>
                <h4>{ forecast.dayName }</h4>
                <ForecastImage icon={forecast.icon} />
                <h6>
                    { forecast.temp }&deg;F | { forecast.windDirection } at { forecast.windSpeed }
                </h6>
            </div>;
        })}
        </div>
    </Card>
};

const getWeather = async () => {
    const e = await fetch("https://api.weather.gov/gridpoints/MLB/28,80/forecast");
    const r = await e.json();
    const { periods } = r.properties;
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