export type ErrorCode = 'LOCATION_NOT_FOUND' | 'NETWORK_ERROR' | 'API_ERROR' | 'GENERIC_ERROR' | 'FORBIDDEN';  

export interface AppError {
  readonly message: string;
  readonly code: ErrorCode;
  readonly _isAppError: true;
  
}

export const createAppError = (message: string, code: ErrorCode): AppError => ({
  message,
  code,
  _isAppError: true,
});

export const isAppError = (error: unknown): error is AppError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    (error as AppError)._isAppError === true
  );
};