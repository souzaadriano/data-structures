import { CsvReader } from '@/core/modules/csv-reader/csv-reader.adapter';
import { ProductsAndCategoriesUseCase } from './products-and-categories.use-case';
import { Generator } from '@/core/modules/generator/generator.adapter';
import { ProductCategoryRepository } from '@/core/repositories/product-category/product-category-repository.adapter';
import { ProductRepository } from '@/core/repositories/product/product-repository.adapter';

export class ProductsAndCategoriesUseCaseFactory {
  private constructor() {}

  static factory() {
    return new ProductsAndCategoriesUseCase({
      productCagetoryRepository: new ProductCategoryRepository(),
      productRepository: new ProductRepository(),
    });
  }
}
