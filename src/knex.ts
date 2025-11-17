const knexConfig = require('../knexfile');
const knexSetting = require('knex');

let knex;

if (
  process.env.NODE_ENV &&
  Object.keys(knexConfig).includes(process.env.NODE_ENV)
) {
  knex = knexSetting(knexConfig[process.env.NODE_ENV]);
} else {
  knex = knexSetting(knexConfig.development);
}

export default knex;
