import { ProductRepository } from '@/core/repositories/product/product-repository.adapter';
import { WithMapUseCase } from './with-map.use-case';
import { ProductCategoryRepository } from '@/core/repositories/product-category/product-category-repository.adapter';

export class WithMapUseCaseFactory {
  private constructor() {}

  static factory() {
    return new WithMapUseCase({
      productCategoryRepository: new ProductCategoryRepository(),
      productRepository: new ProductRepository(),
    });
  }
}
