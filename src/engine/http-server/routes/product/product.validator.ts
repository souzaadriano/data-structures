import { inputValidatorMiddleware } from '../../middlewares/input-validator/input-validator.middleware';
import { ListProductsSchema } from './schema/list-products.schema';

export const listProductValidator = inputValidatorMiddleware(ListProductsSchema);
