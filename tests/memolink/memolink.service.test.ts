import { describe, afterEach, it, expect, vi } from 'vitest';
import MemoLinkService from '@/memolink/memolink.service';
import MemoLinkRepository from '@root/src/memolink/memolink.repository';
import MemoLink from '@root/src/model/MemoLinkModel';
import getHeadOfLink from '@root/src/tools/getHeadOfLink';

vi.mock('@/tools/getHeadOfLink');

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
    const mockedGetHead = vi.mocked(getHeadOfLink);
    it('新しいMemoLinkを追加する', async () => {
      mockedGetHead.mockResolvedValue({
        siteName: '',
        title: '',
        description: '',
        ogpUri: '',
      });
      const insertSpy = vi.spyOn(mockRepos, 'create');
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        siteName: '',
        linkTitle: '',
        linkDescription: '',
        ogpUri: '',
      };
      await service.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith(newMemoLink);
    });

    it('追加するリンク先の情報を取得してDBへ保存する', async () => {
      mockedGetHead.mockResolvedValue({
        siteName: 'sample',
        title: 'sample title',
        description: 'sample description string',
        ogpUri: 'sample image uri',
      });
      const insertSpy = vi.spyOn(mockRepos, 'create');
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
      };
      await service.create(newMemoLink);

      expect(insertSpy).toHaveBeenCalledWith({
        ...newMemoLink,
        siteName: 'sample',
        linkTitle: 'sample title',
        linkDescription: 'sample description string',
        ogpUri: 'sample image uri',
      });
    });

    it('URIが正しい形式じゃない時にエラーを返す', async () => {
      vi.mocked(getHeadOfLink).mockRejectedValue('URL Parse Error');
      const newMemoLink: MemoLink = {
        id: 1,
        linkUri: 'example',
        memo: 'sample memo',
      };
      expect(service.create(newMemoLink)).rejects.toThrowError(
        'URL Parse Error'
      );
    });
  });
});
