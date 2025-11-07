import styles from "./styles/forecastImage.module.css";
import ForecastImage from "./ForecastImage";

interface Forecast {
    dayName: string; icon: string; temp: number; windSpeed: string; windDirection: string;
}

const WeatherData = ({ forecasts }: { forecasts: Forecast[] }) => {
    return forecasts.map((forecast: Forecast, index: number) => {
        return <div className={styles.content} key={index}>
            <h4>{forecast.dayName}</h4>
            <ForecastImage icon={forecast.icon}/>
            <h6>
                {forecast.temp}&deg;F | {forecast.windDirection} at {forecast.windSpeed}
            </h6>
        </div>;
    });
};

export default WeatherData;