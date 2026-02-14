import type { ErrorCode } from "./errors-code";

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly isAppError = true;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }
}
