import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import theme from "./theme";
import modal from "./modal";
import weather from "./weather";
import snackbar from "./snackbar";
import location from "./location";
import post from "./post";
import user from "./user";
import tag from "./tag";
import language from "./language";

const rootReducer = combineReducers({
  theme,
  modal,
  weather,
  snackbar,
  location,
  post,
  user,
  tag,
  language,
});

const persistConfig = {
  key: "root",
  storage,
  whiteList: [
    "theme",
    "modal",
    "weather",
    "snackbar",
    "location",
    "post",
    "user",
    "tag",
    "language",
  ],
};

const persistReducers = persistReducer(persistConfig, rootReducer);

export default persistReducers;
