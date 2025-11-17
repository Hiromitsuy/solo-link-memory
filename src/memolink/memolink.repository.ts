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
    return await this.knex<MemoLink>(this.table).select().limit(limit);
  }

  async create(memolink: MemoLink) {
    memolink.createdAt = new Date();
    memolink.updatedAt = new Date();
    await this.knex(this.table).insert(memolink);
    return;
  }
}
