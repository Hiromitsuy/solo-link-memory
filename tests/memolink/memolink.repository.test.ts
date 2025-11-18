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
  knexMock.first = () => knexMock;
  knexMock.where = () => null;
  knexMock.returning = () => knexMock;

  const reposotory = new MemoLinkRepository(knexMock as unknown as Knex);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('list', () => {
    it('MemoLink Tableのデータを最大件数（20件）取得する', async () => {
      const selectSpy = vi.spyOn(knexMock, 'select');
      const limitSpy = vi.spyOn(knexMock, 'limit');
      await reposotory.list();

      expect(selectSpy).toHaveBeenCalledWith();
      expect(limitSpy).toHaveBeenCalledWith(20);
    });

    it('MemoLink Tableから10件のデータを取得する', async () => {
      const selectSpy = vi.spyOn(knexMock, 'select');
      const limitSpy = vi.spyOn(knexMock, 'limit');
      await reposotory.list(10);

      expect(selectSpy).toHaveBeenCalledWith();
      expect(limitSpy).toHaveBeenCalledWith(10);
    });
  });

  describe('find', () => {
    it('引数で指定したIDのデータを取得する', async () => {
      const id = 2;
      const firstSpy = vi.spyOn(knexMock, 'first');
      const whereSpy = vi.spyOn(knexMock, 'where');
      await reposotory.find(id);

      expect(firstSpy).toHaveBeenCalledOnce();
      expect(whereSpy).toHaveBeenCalledWith('id', 2);
    });

    it('引数で指定したIDのデータを取得する', async () => {
      const id = 2;
      const resolvedValue: MemoLink = {
        id: 2,
        linkUri: '',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(knexMock.where).mockResolvedValue(resolvedValue);
      const data = await reposotory.find(id);
      expect(data).toBe(resolvedValue);
    });
  });

  describe('create', () => {
    it('新しいMemoLinkオブジェクトをDBに追加する', async () => {
      const insertSpy = vi.spyOn(knexMock, 'insert');
      const nowDatetime = new Date();
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        createdAt: nowDatetime,
        updatedAt: nowDatetime,
      };
      await reposotory.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith(newMemoLink);
    });
  });
});
