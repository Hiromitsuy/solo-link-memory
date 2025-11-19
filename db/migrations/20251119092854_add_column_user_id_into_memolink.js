/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('memolink', (table) => {
    table.string('userId', 255).notNullable();
    table.boolean('isPublic').notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('memolink', (table) => {
    table.dropColumn('userId', 1024);
    table.dropColumn('isPublic');
  });
};
