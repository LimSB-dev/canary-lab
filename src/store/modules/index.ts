import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import theme from "./theme";
import modal from "./modal";
import weather from "./weather";
import snackbar from "./snackbar";
import location from "./location";

const rootReducer = combineReducers({
  theme,
  modal,
  weather,
  snackbar,
  location,
  // Add your reducers here
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["theme", "modal", "weather", "snackbar", "location"],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
