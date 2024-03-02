import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { setWeatherData } from "@/store/modules/weather";
import compareTime from "@/utils/compareTime";
import convertUnixTime from "@/utils/convertUnixTime";

/**
 * @description find the current weather and set it to the redux store
 * @returns {object} { loading, error }
 */
export const useWeather = () => {
  const dispatch = useAppDispatch();
  const dt = useAppSelector((state) => state.weather.weatherData?.dt);
  const formattedTime = convertUnixTime(dt);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      dispatch(setWeatherData(camelcaseKeys(data, { deep: true })));
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onGeoOk = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    fetchWeather(latitude, longitude);
  };

  const onGeoError = (error: GeolocationPositionError) => {
    console.error("Error getting geolocation:", error);
  };

  useEffect(() => {
    if (
      compareTime(new Date().toTimeString().split(" ")[0], formattedTime) ||
      !dt
    ) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    } else {
      setLoading(false);
    }
  }, [dt]);

  return { loading, error };
};

export default useWeather;
