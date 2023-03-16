import { ProductEntity } from './product.entity';

export interface ProductRepositoryContract {
  save(entity: ProductEntity): Promise<void>;
  list(quantity: number): Promise<ProductEntity[]>;
}
