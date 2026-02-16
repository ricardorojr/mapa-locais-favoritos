// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorProvider } from "./shared/errors/error-provider/error-provider.tsx";
import { ErrorToast } from "./components/ui/ErrorToast";
import { AppRoutes } from "./routes/index.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function App() {
  return (
    <ErrorProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <ErrorToast />
      </QueryClientProvider>
    </ErrorProvider>
  );
}
