import { EXCEPTION_TYPE, Exception } from "@/shared/exception.entity";
import { Singleton } from "@/shared/singleton.decorator";

@Singleton
export class ExceptionHandler {
  async handle(error: any): Promise<ResponseError> {
    const exception = this.upgradeError(error);
    const status = this.exceptionStatus(exception.type);

    console.error(exception);
    return { status, message: exception.message };
  }

  exceptionStatus(type: EXCEPTION_TYPE) {
    switch (type) {
      case EXCEPTION_TYPE.UNEXPECTED_EXCEPTION:
        return 500;
      case EXCEPTION_TYPE.UNAUTHORIZED:
        return 401;
      case EXCEPTION_TYPE.FORBIDEN:
        return 403;
      case EXCEPTION_TYPE.INVALID_INPUT:
        return 400;
      case EXCEPTION_TYPE.ERROR:
        return 400;
      case EXCEPTION_TYPE.CONFIG_EXCEPTION:
        return 500;
    }
  }

  private upgradeError(error: any) {
    if (error.isException) return error as Exception;
    if (error instanceof Error) {
      return new Exception({
        context: 'upgraded',
        message: error.message,
        error: error,
        type: EXCEPTION_TYPE.UNEXPECTED_EXCEPTION,
      });
    }

    return new Exception({
      context: 'unexpected',
      message: 'unespected error',
      error: error,
      data: { error },
      type: EXCEPTION_TYPE.UNEXPECTED_EXCEPTION,
    });
  }
}

export type ResponseError = {
  status: number;
  message: string;
};