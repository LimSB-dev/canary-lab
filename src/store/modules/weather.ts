import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

// state type
export interface WeatherSlice {
  city: string;
  weatherData: WeatherData | null;
}

// 초기 상태 정의
const initialState: WeatherSlice = {
  city: "Seoul",
  weatherData: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCity(state, action) {
      state.city = action.payload;
    },
    setWeatherData(state, action) {
      state.weatherData = action.payload;
    },
  },
});

// 액션 생성함수
export const { setCity, setWeatherData } = weatherSlice.actions;
export const selectWeather = (state: RootState) => state.weather;
// 리듀서
export default weatherSlice.reducer;
