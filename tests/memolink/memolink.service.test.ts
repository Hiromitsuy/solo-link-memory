import { describe, afterEach, it, expect, vi } from 'vitest';
import MemoLinkService from '@/memolink/memolink.service';
import MemoLinkRepository from '@root/src/memolink/memolink.repository';
import MemoLink from '@root/src/model/MemoLinkModel';

describe('memolink service', () => {
  const mockRepos: MemoLinkRepository = {
    list: async (n) => null,
    find: async () => null,
    create: async () => null,
    knex: undefined,
    table: '',
  };
  const service = new MemoLinkService(mockRepos);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('list', () => {
    it('MemoLinkの一覧を取得する', async () => {
      const spyList = vi.spyOn(mockRepos, 'list');
      await service.list();

      expect(spyList).toHaveBeenCalledWith();
    });

    it('MemoLinkから指定の件数だけデータを取得する', async () => {
      const spyList = vi.spyOn(mockRepos, 'list');
      await service.list(15);

      expect(spyList).toHaveBeenCalledWith(15);
    });
  });

  describe('findById', () => {
    it('指定のIDのMemoLinkを取得する', async () => {
      const spyFind = vi.spyOn(mockRepos, 'find');
      await service.findById(2);
      expect(spyFind).toHaveBeenCalledWith(2);
    });

    it('MemoLinkを返す', async () => {
      const resolvedFind = {
        id: 2,
        linkUri: '',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(mockRepos.find).mockResolvedValue(resolvedFind);

      const data = await service.findById(2);
      expect(data).toBe(resolvedFind);
    });
  });

  describe('create', () => {
    it('新しいMemoLinkを追加する', async () => {
      const insertSpy = vi.spyOn(mockRepos, 'create');
      const nowDatetime = new Date();
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        createdAt: nowDatetime,
        updatedAt: nowDatetime,
      };
      await service.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith(newMemoLink);
    });
  });
});
