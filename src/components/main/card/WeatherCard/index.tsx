"use client";

import useWeather from "@/hooks/useWeather";
import styles from "./styles.module.scss";
import useCity from "@/hooks/useCity";
import Image from "next/image";
import { useAppSelector } from "@/hooks/reduxHook";

export const WeatherCard = () => {
  const { loading: cityLoading, error: cityError } = useCity();
  const { loading: weatherLoading, error: weatherError } = useWeather();

  const city = useAppSelector((state) => state.location.city);
  const weatherData = useAppSelector((state) => state.weather.weatherData);

  if (cityError || weatherError) {
    return (
      <article className={styles.card}>
        <h5>{weatherError}</h5>
        <h5>{cityError}</h5>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <div className={`${styles.flex_row} ${styles.spaceBetween}`}>
        {cityLoading || !city ? <h6>Finding location...</h6> : <h4>{city}</h4>}
        {weatherLoading || (
          <Image
            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            width={50}
            height={50}
            alt={weatherData?.weather[0].description ?? ""}
          />
        )}
      </div>
      {weatherLoading || (
        <>
          <h2>{weatherData?.main.temp}°</h2>
          <div className={styles.flex_row}>
            <p>MAX: {weatherData?.main.tempMax.toFixed(1)}°</p>
            <p>MIN: {weatherData?.main.tempMin.toFixed(1)}°</p>
          </div>
        </>
      )}
    </article>
  );
};
