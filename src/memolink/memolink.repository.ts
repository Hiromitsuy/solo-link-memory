import { Knex } from 'knex';
import MemoLink from '@/model/MemoLinkModel';

export default class MemoLinkRepository {
  knex: Knex;
  table: string;

  constructor(knex, table = 'memolink') {
    this.knex = knex;
    this.table = table;
  }

  async list(limit = 20) {
    return await this.knex.select<MemoLink[]>().from(this.table).limit(limit);
  }
  async create(memolink: MemoLink) {
    return await this.knex(this.table).insert(memolink);
  }
}
