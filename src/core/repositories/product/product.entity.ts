import { GeneratorContract } from '@/core/modules/generator/generator.contract';

export class ProductEntity {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(input: Constructor) {
    this.id = input.id;
    this.name = input.name;
    this.price = input.price;
    this.categoryId = input.categoryId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.deletedAt = input.deletedAt;
  }

  static create(input: Create) {
    const { id, name, price, categoryId } = input;
    return new ProductEntity({
      id,
      name,
      price,
      categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }
}

type Create = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
};

type Constructor = {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly categoryId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
