import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('product_category', (table) => {
    table.string('id', 36).primary().notNullable().unique();
    table.string('name', 500).unique();
    table.dateTime('createdAt').notNullable();
    table.dateTime('updatedAt').notNullable();
    table.dateTime('deletedAt').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('product_category');
}
