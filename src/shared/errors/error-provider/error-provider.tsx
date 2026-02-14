import { useState, type ReactNode } from "react";
import { ErrorContext } from "./error-context";

interface Props {
  children: ReactNode;
}

export function ErrorProvider({ children }: Props) {
  const [error, setError] = useState<string | null>(null);

  function showError(message: string) {
    setError(message);
  }

  function clearError() {
    setError(null);
  }

  return (
    <ErrorContext.Provider value={{ error, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}
