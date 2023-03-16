import { GeneratorContract } from '@/core/modules/generator/generator.contract';

export class ProductCategoryEntity {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;

  constructor(input: Constructor) {
    this.id = input.id;
    this.name = input.name;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.deletedAt = input.deletedAt;
  }

  static create(input: Create): ProductCategoryEntity {
    const { name, id } = input;
    return new ProductCategoryEntity({
      id,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });
  }
}

type Create = {
  readonly id: string;
  readonly name: string;
};

type Constructor = {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
