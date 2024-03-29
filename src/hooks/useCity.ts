import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { setCity } from "@/store/modules/location";

/**
 * @description find the current city and set it to the redux store
 * @returns {object} { loading, error }
 */
export const useCity = () => {
  const dispatch = useAppDispatch();
  const dt = useAppSelector((state) => state.weather.weatherData?.dt);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

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
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Please allow location access.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is not available.");
        break;
      case error.TIMEOUT:
        setError("Please try again later.");
        break;
      default:
        setError("Please submit this error.");
        break;
    }
  };

  useEffect(() => {
    if (!dt) return;

    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
    setLoading(false);
  }, [dt]);

  return { loading, error };
};

export default useCity;
