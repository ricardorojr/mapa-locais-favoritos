import { AppError } from "./app-error";
import { ERROR_CODES, type ErrorCode } from "./errors-code";
import { isAppError } from "./../utils/error-utils";

const DEFAULT_HEADERS: HeadersInit = {
  Accept: "application/json",
  "Accept-Language": "pt-BR",
};

type ErrorDefinition = {
  message: string;
  code: ErrorCode;
};

const errorMap: Record<number, ErrorDefinition> = {
  400: { message: "Requisição inválida.", code: ERROR_CODES.BAD_REQUEST },
  401: { message: "Não autorizado.", code: ERROR_CODES.UNAUTHORIZED },
  403: { message: "Acesso negado.", code: ERROR_CODES.FORBIDDEN },
  404: { message: "Recurso não encontrado.", code: ERROR_CODES.NOT_FOUND },
  500: { message: "Serviço indisponível.", code: ERROR_CODES.API_ERROR },
};

const extractServerMessage = async (
  response: Response,
): Promise<string | undefined> => {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    return undefined;
  }

  try {
    const data = await response.json();
    return data?.message ?? data?.error;
  } catch {
    return undefined;
  }
};

const handleResponseError = async (response: Response): Promise<never> => {
  const serverMessage = await extractServerMessage(response);

  const statusKey = response.status >= 500 ? 500 : response.status;

  const mappedError = errorMap[statusKey] ?? {
    message: "Erro inesperado na comunicação.",
    code: ERROR_CODES.GENERIC_ERROR,
  };

  throw new AppError(serverMessage ?? mappedError.message, mappedError.code);
};

const handleCatchError = (error: unknown): never => {
  if (isAppError(error)) {
    throw error;
  }

  if (error instanceof Error && error.name === "AbortError") {
    throw error;
  }

  throw new AppError("Falha na conexão com o servidor.", ERROR_CODES.API_ERROR);
};

export const httpClient = {
  async get<T>(url: string, signal?: AbortSignal): Promise<T> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: DEFAULT_HEADERS,
        signal,
      });

      if (!response.ok) {
        await handleResponseError(response);
      }

      return (await response.json()) as T;
    } catch (error) {
      return handleCatchError(error);
    }
  },
};
