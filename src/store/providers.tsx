"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// local
import store from ".";

export function Providers({ children }: { children: React.ReactNode }) {
  const persist = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>{children}</PersistGate>
    </Provider>
  );
}
