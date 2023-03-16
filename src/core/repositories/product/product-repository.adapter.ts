import { DatabaseEngine } from '@/engine/database/database.engine';
import { ProductRepositoryContract } from './product-repository.contract';
import { ProductEntity } from './product.entity';

export class ProductRepository implements ProductRepositoryContract {
  private readonly database = new DatabaseEngine();

  async save(entity: ProductEntity): Promise<void> {
    await this.database.use('product').insert(entity);
  }

  async list(quantity: number): Promise<ProductEntity[]> {
    const data = await this.database.raw<ProductEntity>({
      sql: `select * from product limit ${quantity}`,
    });

    return data.rows;
  }
}
