import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHERMAP_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeatherData(camelcaseKeys(data, { deep: true }));
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
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  return { weatherData, loading, error };
};

export default useWeather;
