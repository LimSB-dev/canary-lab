"use client";

import useWeather from "@/hooks/useWeather";
import styles from "./styles.module.scss";
import useCity from "@/hooks/useCity";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import convertUnixTime from "@/utils/convertUnixTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faSpinner,
  faThermometer,
} from "@fortawesome/free-solid-svg-icons";
import { setDataReceivingTime } from "@/store/modules/weather";

export const WeatherCard = () => {
  const { loading: cityLoading, error: cityError } = useCity();
  const { loading: weatherLoading, error: weatherError } = useWeather();
  console.log("🚀 ~ WeatherCard ~ weatherLoading:", weatherLoading);

  const dispatch = useAppDispatch();

  const city = useAppSelector((state) => state.location.city);
  const weatherData = useAppSelector((state) => state.weather.weatherData);

  const sunrise = convertUnixTime(weatherData?.sys.sunrise)
    .split(":")
    .map(Number);
  const sunset = convertUnixTime(weatherData?.sys.sunset)
    .split(":")
    .map(Number);

  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();

  let cardBackground = styles.day;
  if (!weatherData) {
    cardBackground = styles.day;
  } else if (
    (hour === sunrise[0] && minute >= sunrise[1] - 10) ||
    (hour === sunrise[0] - 1 && minute >= 10)
  ) {
    cardBackground = styles.sunrise;
  } else if (
    (hour === sunset[0] && minute >= sunset[1] - 10) ||
    (hour === sunset[0] - 1 && minute >= 10)
  ) {
    cardBackground = styles.sunset;
  } else if (
    (hour > sunrise[0] && hour < sunset[0]) ||
    (hour === sunrise[0] && minute >= sunrise[1] + 10) ||
    (hour === sunset[0] && minute <= sunset[1] - 10)
  ) {
    cardBackground = styles.day;
  } else {
    cardBackground = styles.night;
  }

  if (cityError || weatherError) {
    return (
      <article className={styles.card}>
        <p className={styles.cityError}>{cityError || weatherError}</p>
      </article>
    );
  }

  return (
    <article className={`${styles.card} ${cardBackground}`}>
      <div className={`${styles.flex_row} ${styles.spaceBetween}`}>
        {(weatherLoading && cityLoading) || !city ? (
          <div className={styles.flex_row}>
            <FontAwesomeIcon icon={faSpinner} spin size="lg" />
            <h6>Finding location</h6>
          </div>
        ) : (
          <div className={styles.flex_row}>
            <h4>{city}</h4>
            <FontAwesomeIcon
              className={styles.location_icon}
              icon={faLocationArrow}
            />
          </div>
        )}
        {weatherLoading || (
          <div className={styles.flex_column}>
            <Image
              className={styles.weather_icon}
              src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
              width={50}
              height={50}
              alt={weatherData?.weather[0].description ?? ""}
            />
            <p>{weatherData?.weather[0].main.toUpperCase()}</p>
          </div>
        )}
      </div>
      {!weatherLoading ? (
        <>
          <h2>{weatherData?.main.temp.toFixed(1)}°</h2>
          <div className={styles.flex_row}>
            <p>MAX: {weatherData?.main.tempMax.toFixed(1)}°</p>
            <p>MIN: {weatherData?.main.tempMin.toFixed(1)}°</p>
            <FontAwesomeIcon
              className={styles.thermometer_icon}
              onClick={() => {
                dispatch(setDataReceivingTime());
              }}
              icon={faThermometer}
            />
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faSpinner} spin size="2xl" />
          <p>Measuring Temperature</p>
        </>
      )}
    </article>
  );
};
