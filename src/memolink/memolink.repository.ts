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

  async find(id) {
    return await this.knex<MemoLink>(this.table).first().where('id', id);
  }

  async create(memolink: MemoLink) {
    memolink.createdAt = new Date();
    memolink.updatedAt = new Date();
    const created = await this.knex(this.table).returning('*').insert(memolink);
    return created;
  }
}
