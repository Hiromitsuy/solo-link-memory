import { describe, afterEach, it, expect, vi } from 'vitest';
import MemoLinkRepository from '@/memolink/memolink.repository';
import MemoLink from '@/model/MemoLinkModel';
import { Knex } from 'knex';

describe('memolink reposotory', () => {
  const knexMock = function (tablename: string) {
    return knexMock;
  };
  knexMock.select = () => knexMock;
  knexMock.from = () => knexMock;
  knexMock.limit = (limit: number) => knexMock;
  knexMock.insert = (payload: object) => knexMock;

  let reposotory = new MemoLinkRepository(knexMock as unknown as Knex);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('list', () => {
    it('MemoLink Tableのデータを最大件数（20件）取得する', async () => {
      const selectSpy = vi.spyOn(knexMock, 'select');
      const fromSpy = vi.spyOn(knexMock, 'from');
      const limitSpy = vi.spyOn(knexMock, 'limit');
      await reposotory.list();

      expect(selectSpy).toHaveBeenCalledWith();
      expect(fromSpy).toHaveBeenCalledWith('memolink');
      expect(limitSpy).toHaveBeenCalledWith(20);
    });

    it('MemoLink Tableから10件のデータを取得する', async () => {
      const selectSpy = vi.spyOn(knexMock, 'select');
      const fromSpy = vi.spyOn(knexMock, 'from');
      const limitSpy = vi.spyOn(knexMock, 'limit');
      await reposotory.list(10);

      expect(selectSpy).toHaveBeenCalledWith();
      expect(fromSpy).toHaveBeenCalledWith('memolink');
      expect(limitSpy).toHaveBeenCalledWith(10);
    });
  });

  describe('create', () => {
    it('新しいMemoLinkオブジェクトをDBに追加する', async () => {
      const insertSpy = vi.spyOn(knexMock, 'insert');
      const nowDatetimeString = Date.now().toLocaleString();
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        created_at: nowDatetimeString,
        updated_at: nowDatetimeString,
      };
      await reposotory.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith(newMemoLink);
    });
  });
});
