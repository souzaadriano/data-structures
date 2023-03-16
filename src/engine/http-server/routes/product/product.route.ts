import {
  ClassErrorMiddleware,
  ClassMiddleware,
  Controller,
  ErrorMiddleware,
  Get,
  Middleware,
  Post,
} from '@overnightjs/core';
import { Request, Response } from 'express';
import { errorHandler } from '../../middlewares/error-handler/error-handler.middleware';
import { listProductValidator } from './product.validator';
import { ProductsAndCategoriesUseCaseFactory } from '@/core/use-cases/populate-database/products-and-categories/products-and-categories.factory';
import { WithFindUseCaseFactory } from '@/core/use-cases/interation/with-find/with-find.factory';
import { WithMapUseCaseFactory } from '@/core/use-cases/interation/with-map/with-map.factory';

@Controller('product')
@ClassErrorMiddleware(errorHandler)
export default class ProductRoutes {
  private readonly listProductsWithFind = WithFindUseCaseFactory.factory();
  private readonly listProductsWithMap = WithMapUseCaseFactory.factory();

  @Post('list-find')
  @Middleware(listProductValidator)
  async listFind(request: Request, response: Response) {
    const payload = await this.listProductsWithFind.execute(request.input);
    return response.status(200).json(payload);
  }

  @Post('list-map')
  @Middleware(listProductValidator)
  async listMap(request: Request, response: Response) {
    const payload = await this.listProductsWithMap.execute(request.input);
    return response.status(200).json(payload);
  }
}
