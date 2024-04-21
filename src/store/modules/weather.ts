import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface WeatherSlice {
  weatherData: IWeatherData | null;
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
    setDataReceivingTime(state) {
      if (!state?.weatherData?.dt) return;

      state.weatherData.dt = 0;
    },
  },
});

// action creators
export const { setWeatherData, setDataReceivingTime } = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
// reducer
export default weatherSlice.reducer;
