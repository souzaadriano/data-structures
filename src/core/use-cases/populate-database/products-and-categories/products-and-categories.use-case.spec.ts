import { ProductsAndCategoriesUseCase } from "./products-and-categories.use-case";

describe('products-and-categories.use-case', () => {
    let sut: ProductsAndCategoriesUseCase;
  
    beforeEach(() => {
      sut = new ProductsAndCategoriesUseCase({});
    });
  
    it('shoud be defined', () => {
      expect(sut).toBeDefined();
    });
})
