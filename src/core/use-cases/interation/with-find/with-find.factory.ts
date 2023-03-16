import { ProductCategoryRepository } from '@/core/repositories/product-category/product-category-repository.adapter';
import { WithFindUseCase } from './with-find.use-case';
import { ProductRepository } from '@/core/repositories/product/product-repository.adapter';

export class WithFindUseCaseFactory {
  private constructor() {}

  static factory() {
    return new WithFindUseCase({
      productCategoryRepository: new ProductCategoryRepository(),
      productRepository: new ProductRepository(),
    });
  }
}
