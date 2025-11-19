/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table('memolink', (table) => {
    table.string('userId', 255);
    table.boolean('isPublic');
  });

  await knex('memolink').whereNull('userId').update({
    userId: 'default_user_id',
  });
  await knex('memolink').whereNull('isPublic').update({
    isPublic: false,
  });

  return await knex.schema.alterTable('memolink', (table) => {
    table.string('userId', 255).notNullable().alter();
    table.boolean('isPublic').notNullable().defaultTo(false).alter();
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
