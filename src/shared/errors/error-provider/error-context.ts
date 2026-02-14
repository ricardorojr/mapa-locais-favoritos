import { createContext, useContext } from "react";

interface ErrorContextData {
  error: string | null;
  showError: (message: string) => void;
  clearError: () => void;
}

export const ErrorContext = createContext<ErrorContextData | undefined>(
  undefined,
);

export function useGlobalError() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useGlobalError must be used within ErrorProvider");
  }

  return context;
}
