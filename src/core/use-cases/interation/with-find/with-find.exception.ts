import { Exception, ExtendsConstructor, EXCEPTION_TYPE } from '@/shared/exception.entity';

export class WithFindUseCaseBaseException extends Exception {
  constructor(input: ExtendsConstructor) {
    super({
      context: 'use-case.with-find',
      message: input.message,
      data: input.data,
      error: input.error,
      type: input.type,
    });
  }
}
