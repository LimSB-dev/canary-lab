import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { setCity } from "@/store/modules/weather";
import convertUnixTime from "@/utils/convertUnixTime";
import compareTime from "@/utils/compareTime";

export const useCity = () => {
  const dispatch = useAppDispatch();
  const dt = useAppSelector((state) => state.weather.weatherData?.dt);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        const city = data.results[0].components.city;
        dispatch(setCity(city));
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onGeoOk = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    fetchCity(latitude, longitude);
  };

  const onGeoError = (error: GeolocationPositionError) => {
    console.error("Error getting geolocation:", error);
  };

  useEffect(() => {
    if (dt) {
      const now = new Date().toTimeString().split(" ")[0];
      const formattedTime = convertUnixTime(dt);

      if (compareTime(now, formattedTime)) {
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
      } else {
        setLoading(false);
      }
    }
  }, []);

  return { loading, error };
};

export default useCity;
