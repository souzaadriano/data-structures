import { ProductCategoryEntity } from './product-category.entity';

export interface ProductCategoryRepositoryContract {
  save(entity: ProductCategoryEntity): Promise<void>;
  list(): Promise<ProductCategoryEntity[]>;
}
