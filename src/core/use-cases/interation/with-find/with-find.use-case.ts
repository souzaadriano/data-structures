import { ProductCategoryRepositoryContract } from '@/core/repositories/product-category/product-category-repository.contract';
import { ProductRepositoryContract } from '@/core/repositories/product/product-repository.contract';
import { UseCaseContract } from '@/shared/use-case.contract';

export class WithFindUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  public async execute(input: Input): Promise<Output> {
    const { quantity } = input;
    const { categories, products } = await this.getData(quantity);
    const startTime = performance.now();
    let productsIterations = 0;
    let categoriesIterations = 0;
    const productsWithCategories = products.map((product) => {
      productsIterations = productsIterations + 1;
      const category = categories.find((category) => {
        categoriesIterations = categoriesIterations + 1;
        return category.id === product.categoryId;
      });
      return { ...product, category };
    });
    const endTime = performance.now();

    return {
      executionTime: (endTime - startTime) / 1000,
      iterations: {
        products: productsIterations,
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

type Input = {
  quantity: number;
};
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
