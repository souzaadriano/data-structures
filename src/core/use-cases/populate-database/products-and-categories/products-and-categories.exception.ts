import { Exception, ExtendsConstructor, EXCEPTION_TYPE } from '@/shared/exception.entity';

export class ProductsAndCategoriesUseCaseBaseException extends Exception {
  constructor(input: ExtendsConstructor) {
    super({
      context: 'use-case.products-and-categories',
      message: input.message,
      data: input.data,
      error: input.error,
      type: input.type,
    });
  }
}
