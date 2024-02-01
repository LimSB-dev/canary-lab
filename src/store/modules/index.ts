import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import theme from "./theme";
import modal from "./modal";
import weather from "./weather";
import snackbar from "./snackbar";

const rootReducer = combineReducers({
  theme,
  modal,
  weather,
  snackbar,
  // 여기에 추가하세요
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["theme", "modal", "weather", "snackbar"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
