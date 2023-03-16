import { Exception, ExtendsConstructor, EXCEPTION_TYPE } from '@/shared/exception.entity';

export class WithMapUseCaseBaseException extends Exception {
  constructor(input: ExtendsConstructor) {
    super({
      context: 'use-case.with-map',
      message: input.message,
      data: input.data,
      error: input.error,
      type: input.type,
    });
  }
}
