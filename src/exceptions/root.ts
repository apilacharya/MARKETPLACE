import { logger } from "../lib/logger";

export class HttpException extends Error {
  public message: string;
  public errorCode: ErrorCode;
  public statusCode: number;
  public error: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    logger.error(message);
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.error = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXIST = 1002,
  INCORRECT_PASSWORD = 1003,
  ADDRESS_NOT_FOUND = 1004,
  ADDRESS_DOES_NOT_BELONG = 1005,
  UNPROCESSABLE_ENTITY = 2001,
  INTERNAL_EXCEPTION = 3001,
  UNAUTHORIZED_EXCEPTION = 4001,
  PRODUCT_NOT_FOUND = 5001,
  ORDER_NOT_FOUND = 5002,
}
