import ProductRoutes from './product/product.route';
import SystemRoutes from './system/system.route';

export const factoryControllers = () => [new SystemRoutes(), new ProductRoutes()];
