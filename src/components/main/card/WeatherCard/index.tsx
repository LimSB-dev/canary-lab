"use client";

import useWeather from "@/hooks/useWeather";
import styles from "./styles.module.scss";
import useCity from "@/hooks/useCity";

export const WeatherCard = () => {
  const { city, loading: cityLoading, error: cityError } = useCity();
  const {
    weatherData,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather();

  if (cityLoading || weatherLoading) {
    return (
      <article className={styles.card}>
        <h5>Loading...</h5>
      </article>
    );
  }

  if (cityError || weatherError) {
    return (
      <article className={styles.card}>
        <h5>Can not find you.</h5>
      </article>
    );
  }

  return (
    <article className={styles.card}>
      <h4>{city}</h4>
      <h2>{weatherData?.main.temp}°</h2>
      <div className={styles.flex_row}>
        <p>MAX: {weatherData?.main.tempMax.toFixed(1)}°</p>
        <p>MIN: {weatherData?.main.tempMin.toFixed(1)}°</p>
      </div>
    </article>
  );
};
