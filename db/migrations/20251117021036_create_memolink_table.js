/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('memolink', (table) => {
    table.increments('id').primary();
    table.string('linkUri').notNullable();
    table.string('memo', 255);
    table.datetime('createdAt').notNullable();
    table.datetime('updatedAt').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('memolink');
};
