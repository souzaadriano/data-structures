import { ProductCategoryRepositoryContract } from '@/core/repositories/product-category/product-category-repository.contract';
import { ProductCategoryEntity } from '@/core/repositories/product-category/product-category.entity';
import { ProductRepositoryContract } from '@/core/repositories/product/product-repository.contract';
import { ProductEntity } from '@/core/repositories/product/product.entity';
import { UseCaseContract } from '@/shared/use-case.contract';

export class WithMapUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  public async execute(input: Input): Promise<Output> {
    const { quantity } = input;
    let categoriesIterations = 0;
    let productIterations = 0;
    const { categories, products } = await this.getData(quantity);
    const startTime = performance.now();
    const categoriesMap = new Map<string, string>(
      categories.map((category) => {
        categoriesIterations = categoriesIterations + 1;
        return [category.id, category.name];
      }),
    );

    const productsWithCategories = products.map((product) => {
      productIterations = productIterations + 1;
      const category = categoriesMap.get(product.categoryId);
      return { ...product, category };
    });
    const endTime = performance.now();

    return {
      executionTime: (endTime - startTime) / 1000,
      iterations: {
        products: productIterations,
        categories: categoriesIterations,
      },
    };
  }

  private async getData(quantity: number) {
    const { productCategoryRepository, productRepository } = this.dependencies;
    const [categories, products] = await Promise.all([
      productCategoryRepository.list(),
      productRepository.list(quantity),
    ]);

    return { categories, products };
  }
}

type Input = { quantity: number };
type Output = {
  executionTime: number;
  iterations: {
    products: number;
    categories: number;
  };
};
type Dependencies = {
  productCategoryRepository: ProductCategoryRepositoryContract;
  productRepository: ProductRepositoryContract;
};
