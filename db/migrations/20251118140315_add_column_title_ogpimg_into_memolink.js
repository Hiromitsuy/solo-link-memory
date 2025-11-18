/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('memolink', (table) => {
    table.string('linkTitle');
    table.string('linkDescription');
    table.string('ogpUri');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('memolink', (table) => {
    table.dropColumn('linkTitle');
    table.dropColumn('linkDescription');
    table.dropColumn('ogpUri');
  });
};
