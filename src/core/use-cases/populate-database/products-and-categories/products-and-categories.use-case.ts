import { CsvReaderContract } from '@/core/modules/csv-reader/csv-reader.contract';
import { ProductRepositoryContract } from '@/core/repositories/product/product-repository.contract';
import { UseCaseContract } from '@/shared/use-case.contract';
import { ProdcutRow } from './products-and-categories.types';
import { ProductCategoryEntity } from '@/core/repositories/product-category/product-category.entity';
import { ProductEntity } from '@/core/repositories/product/product.entity';
import { GeneratorContract } from '@/core/modules/generator/generator.contract';
import { appendFile, readdir, readFile } from 'fs/promises';
import { ProductCategoryRepository } from '@/core/repositories/product-category/product-category-repository.adapter';

export class ProductsAndCategoriesUseCase implements UseCaseContract<Input, Output> {
  constructor(private readonly dependencies: Dependencies) {}

  public async execute(input: Input): Promise<Output> {
    const path = './data';
    const { productCagetoryRepository, productRepository } = this.dependencies;
    const categories = await this.saveCategories(path);
    await this.saveProducts(path, categories);
    return {};
  }

  private async saveProducts(path: string, categoryMap: Map<string, string>) {
    const { productRepository } = this.dependencies;
    const files = await readdir(path);
    for (const file of files) {
      if (file === 'categories.data') return;
      const filePath = `${path}/${file}`;
      console.log(`reading ${filePath}`);
      const raw = await readFile(filePath, { encoding: 'utf-8' });
      const data: { id: string; category: string; name: string; price: number }[] = JSON.parse(raw);
      let count = 0;
      let chunk = 0;
      for (const product of data) {
        if (count >= 5000) {
          count = 0;
          console.log(`product chunk: ${chunk}`);
          chunk = chunk + 1;
        }
        const { id, name, category, price } = product;
        const categoryId = categoryMap.get(category);
        if (!categoryId) {
          console.log(`product ${id} can not founded categoryId on ${category}`);
          continue;
        }
        const productEntity = ProductEntity.create({
          id,
          name,
          price,
          categoryId,
        });

        await productRepository.save(productEntity);
        count = count + 1;
      }

      console.log(`file: ${filePath} finished`);
    }
  }

  private async saveCategories(path: string) {
    const { productCagetoryRepository } = this.dependencies;
    const raw = await readFile(`${path}/categories.data`, { encoding: 'utf-8' });
    const data: { id: string; name: string }[] = JSON.parse(raw);
    const categoryMap = new Map<string, string>();
    let count = 0;
    let chunk = 0;
    for (const category of data) {
      if (count >= 5000) {
        console.log(chunk);
        chunk = chunk + 1;
        count = 0;
      }
      count = count + 1;

      const productCategory = ProductCategoryEntity.create(category);
      await productCagetoryRepository.save(productCategory);
      categoryMap.set(productCategory.name, productCategory.id);
    }

    console.log('finished populate: Product Categories');
    return categoryMap;
  }
}

type Input = {
  path: string;
};
type Output = {};
type Dependencies = {
  productRepository: ProductRepositoryContract;
  productCagetoryRepository: ProductCategoryRepository;
};
