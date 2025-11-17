const knexConfig = require('../knexfile');
const knexSetting = require('knex');

export default function getKnex() {
  let knex;
  if (
    process.env.NODE_ENV &&
    Object.keys(knexConfig).includes(process.env.NODE_ENV)
  ) {
    knex = knexSetting(knexConfig[process.env.NODE_ENV]);
  } else {
    knex = knexSetting(knexConfig.development);
  }

  return knex;
}
