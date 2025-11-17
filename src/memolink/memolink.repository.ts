import { Knex } from 'knex';

/**
 * Create connection to database and control data in memolink table.
 * @param {import("knex").Knex} knex
 * @param {string} table
 * @returns Repository
 */
export default function createMemoLinkRepository(
  knex: Knex,
  table = 'memolink'
) {
  const list = async (limit = 20) => {
    return await knex.select().from(table).limit(limit);
  };
  return { list };
}
