"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import store from ".";
import { SyncHtmlLang } from "@/components/common/SyncHtmlLang";

export function Providers({ children }: { children: React.ReactNode }) {
  const persist = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <SyncHtmlLang />
        {children}
      </PersistGate>
    </Provider>
  );
}
