import { JsonDocument } from "./json.type";

export class Exception extends Error {
  readonly isException = true;
  readonly iat: Date;
  readonly data: JsonDocument;
  readonly context: string;
  readonly message: string;
  readonly error?: Error;
  readonly type: EXCEPTION_TYPE;

  constructor(input: ExceptionContructor) {
    super(input.message);
    this.iat = new Date();
    this.data = input.data ?? {};
    this.context = input.context;
    this.message = input.message;
    this.error = input.error;
    this.type = input.type ?? EXCEPTION_TYPE.ERROR;
  }

  get isUpgraded() {
    return this.error ? true : false;
  }

  public report() {
    return {
      issuedAt: this.iat,
      properties: this.data,
      context: this.context,
      message: this.message,
      type: this.type,
      system: {
        exception: {
          stack: this.stack,
          name: this.name,
          message: this.message,
        },
        error: this.error
          ? {
              stack: this.error.stack,
              name: this.error.name,
              message: this.error.message,
            }
          : null,
      },
    };
  }
}

export type ExtendsConstructor = Omit<ExceptionContructor, 'context'> & {};

export enum EXCEPTION_TYPE {
  INVALID_INPUT = 'INVALID_INPUT',
  UNEXPECTED_EXCEPTION = 'UNEXPECTED_EXCEPTION',
  UNAUTHORIZED = 'AUTHORIZATION',
  CONFIG_EXCEPTION = 'CONFIG_EXCEPTION',
  ERROR = 'ERROR',
  FORBIDEN = 'FORBIDEN',
}

export type ExceptionContructor = {
  data?: JsonDocument;
  type?: EXCEPTION_TYPE;
  context: string;
  message: string;
  error?: Error;
};
