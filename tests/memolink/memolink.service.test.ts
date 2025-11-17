import { describe, afterEach, it, expect, vi } from 'vitest';
import MemoLinkService from '@/memolink/memolink.service';
import MemoLinkRepository from '@root/src/memolink/memolink.repository';
import MemoLink from '@root/src/model/MemoLinkModel';

describe('memolink service', () => {
  const mockRepos: MemoLinkRepository = {
    list: async (n) => null,
    create: async () => null,
    knex: undefined,
    table: '',
  };

  let service = new MemoLinkService(mockRepos);

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('list', () => {
    it('MemoLinkの一覧を取得する', () => {
      const spyList = vi.spyOn(mockRepos, 'list');
      service.list();

      expect(spyList).toHaveBeenCalledWith();
    });

    it('MemoLinkから指定の件数だけデータを取得する', () => {
      const spyList = vi.spyOn(mockRepos, 'list');
      service.list(15);

      expect(spyList).toHaveBeenCalledWith(15);
    });
  });

  describe('create', () => {
    it('新しいMemoLinkを追加する', () => {
      const insertSpy = vi.spyOn(mockRepos, 'create');
      const nowDatetime = new Date();
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        createdAt: nowDatetime,
        updatedAt: nowDatetime,
      };
      service.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith(newMemoLink);
    });
  });
});
