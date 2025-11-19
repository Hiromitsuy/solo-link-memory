import { Knex } from 'knex';
import MemoLink from '@/model/MemoLinkModel';

type ListArg = {
  userId?: string;
  includePublic?: boolean;
  sortByLatest?: boolean;
  limit?: number;
};

export default class MemoLinkRepository {
  knex: Knex;
  table: string;

  constructor(knex: Knex, table = 'memolink') {
    this.knex = knex;
    this.table = table;
  }

  async list({ userId, includePublic, sortByLatest, limit }: ListArg) {
    const query = this.knex<MemoLink>(this.table).select();
    if (userId) {
      query.where('userId', userId);
    }
    if (includePublic) {
      userId ? query.orWhere('isPublic', true) : query.where('isPublic', true);
    }
    if (sortByLatest) {
      query.orderBy('createdAt', 'desc');
    }
    limit ? query.limit(limit) : query.limit(20);
    return await query;
  }

  async find(id: number) {
    return await this.knex<MemoLink>(this.table).first().where('id', id);
  }

  async create(memolink: MemoLink) {
    memolink.createdAt = new Date();
    memolink.updatedAt = new Date();
    const created = await this.knex(this.table)
      .returning('*')
      .insert({ ...memolink, id: undefined });
    return created;
  }
}
