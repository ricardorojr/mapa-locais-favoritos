import { createAppError, isAppError } from "./errors";

const DEFAULT_HEADERS = {
  "Accept-Language": "pt-BR",
  "Accept": "application/json",
};

const handleResponseError = (response: Response) => {
  if (response.status === 403) {
    throw createAppError("Acesso negado.", "FORBIDDEN");
  }

  if (response.status >= 500) {
    throw createAppError("Serviço indisponível.", "API_ERROR");
  }

  throw createAppError("Erro na comunicação.", "GENERIC_ERROR");
};

const handleCatchError = (error: unknown) => {
  if (
    isAppError(error) ||
    (error instanceof Error && error.name === "AbortError")
  ) {
    throw error;
  }

  throw createAppError(
    "Falha na conexão com o servidor.",
    "NETWORK_ERROR"
  );
};

export const httpClient = {
  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: DEFAULT_HEADERS,
        signal,
      });

      if (!response.ok) {
        handleResponseError(response);
      }

      return (await response.json()) as T;
    } catch (error) {
      handleCatchError(error);
      throw error; // fallback
    }
  },
};
