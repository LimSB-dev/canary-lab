"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { queryKeys } from "@/constants/queryKey";
import { setCity } from "@/store/modules/location";

type Coords = { latitude: number; longitude: number } | null;

async function fetchCityName(coords: Coords): Promise<string | null> {
  if (!coords) return null;
  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
  );
  if (!response.ok) throw new Error("City not found");
  const data = await response.json();
  if (data?.results?.length > 0) {
    return data.results[0].components.city ?? null;
  }
  return null;
}

/**
 * @description find the current city and set it to the redux store (useQuery)
 * @returns {object} { loading, error }
 */
export const useCity = () => {
  const dispatch = useAppDispatch();
  const dt = useAppSelector((state) => state.weather.weatherData?.dt);
  const [coords, setCoords] = useState<Coords>(null);
  const [geoError, setGeoError] = useState<string>("");

  useEffect(() => {
    if (!dt) return;
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error: GeolocationPositionError) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Please allow location access.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Location information is not available.");
            break;
          case error.TIMEOUT:
            setGeoError("Please try again later.");
            break;
          default:
            setGeoError("Please submit this error.");
        }
      }
    );
  }, [dt]);

  const {
    data: city,
    isPending,
    error,
  } = useQuery({
    queryKey:
      coords != null ? queryKeys.city(coords.latitude, coords.longitude) : ["city", null, null],
    queryFn: () => fetchCityName(coords),
    enabled: !!coords,
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (city) dispatch(setCity(city));
  }, [city, dispatch]);

  return {
    loading: isPending,
    error: geoError || (error instanceof Error ? error.message : ""),
  };
};

export default useCity;
