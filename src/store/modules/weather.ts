import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface WeatherSlice {
  weatherData: WeatherData | null;
}

// define initial state
const initialState: WeatherSlice = {
  weatherData: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
  },
});

// action creators
export const { setWeatherData } = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
// reducer
export default weatherSlice.reducer;
