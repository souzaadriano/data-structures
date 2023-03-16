import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product', (table) => {
    table.string('id', 36).primary().unique().notNullable();
    table.string('name', 500).notNullable();
    table.double('price', 2).notNullable();
    table.string('categoryId').references('id').inTable('product_category').notNullable().onUpdate('CASCADE');
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table.dateTime('deletedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('product');
}
