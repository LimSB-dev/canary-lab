"use client";

import camelcaseKeys from "camelcase-keys";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "./reduxHook";
import { setWeatherData } from "@/store/modules/weather";
import { queryKeys } from "@/constants/queryKey";
import compareTime from "@/utils/compareTime";
import convertUnixTime from "@/utils/convertUnixTime";

type Coords = { latitude: number; longitude: number } | null;

async function fetchWeather(coords: Coords): Promise<unknown> {
  if (!coords) throw new Error("No coordinates");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
  );
  if (!response.ok) throw new Error("City not found");
  return response.json();
}

/**
 * @description find the current weather and set it to the redux store (useQuery)
 * @returns {object} { loading, error }
 */
export const useWeather = () => {
  const dispatch = useAppDispatch();
  const dt = useAppSelector((state) => state.weather.weatherData?.dt);
  const formattedTime = convertUnixTime(dt);
  const [coords, setCoords] = useState<Coords>(null);

  const shouldRefetch =
    !dt || compareTime(new Date().toTimeString().split(" ")[0], formattedTime);

  useEffect(() => {
    if (!shouldRefetch) return;
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () => {}
    );
  }, [shouldRefetch]);

  const { data, isPending, error } = useQuery({
    queryKey:
      coords != null
        ? queryKeys.weather(coords.latitude, coords.longitude)
        : ["weather", null, null],
    queryFn: () => fetchWeather(coords),
    enabled: !!coords,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (data) {
      dispatch(
        setWeatherData(
          camelcaseKeys(data as Record<string, unknown>, { deep: true }) as unknown as IWeatherData
        )
      );
    }
  }, [data, dispatch]);

  const loading =
    (shouldRefetch && !coords) || (!!coords && isPending);

  return {
    loading,
    error: error instanceof Error ? error.message : null,
  };
};

export default useWeather;
