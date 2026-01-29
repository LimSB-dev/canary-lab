"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import store from ".";
import { SyncHtmlLang } from "@/components/common/SyncHtmlLang";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const persist = persistStore(store);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <SyncHtmlLang />
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
