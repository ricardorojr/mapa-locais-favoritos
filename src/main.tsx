import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "./shared/errors/error-provider/error-provider.tsx";
import { ErrorToast } from "./components/ui/ErrorToast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ErrorToast />
      </QueryClientProvider>
    </ErrorProvider>
  </StrictMode>,
);
