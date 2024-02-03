import { useEffect, useState } from "react";

export const useCity = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGEDATA_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        const city = data.results[0].components.city;
        setCity(city);
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
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  return { city, loading, error };
};

export default useCity;
