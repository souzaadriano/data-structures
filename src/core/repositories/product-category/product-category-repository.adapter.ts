import { DatabaseEngine } from '@/engine/database/database.engine';
import { ProductCategoryRepositoryContract } from './product-category-repository.contract';
import { ProductCategoryEntity } from './product-category.entity';

export class ProductCategoryRepository implements ProductCategoryRepositoryContract {
  private readonly database = new DatabaseEngine();

  async save(entity: ProductCategoryEntity): Promise<void> {
    await this.database.use('product_category').insert(entity);
  }

  async list(): Promise<ProductCategoryEntity[]> {
    const data = await this.database.raw<ProductCategoryEntity>({
      sql: `select * from product_category`,
    });

    return data.rows;
  }
}
