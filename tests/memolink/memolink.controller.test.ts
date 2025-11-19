import MemoLinkController from '@/memolink/memolink.controller';
import MemoLinkService from '@/memolink/memolink.service';
import MemoLink from '@/model/MemoLinkModel';
import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';

class MockMemoLinkService extends MemoLinkService {
  constructor() {
    super(null);
  }
  list = () => null;
  findById = () => null;
  create = () => null;
}

describe('memolinik controller', () => {
  const mockService = new MockMemoLinkService();
  mockService.findById = function () {
    return null;
  };

  const mockRes = {
    status: function () {
      return this;
    },
    send: function () {
      return this;
    },
    json: function () {
      return this;
    },
    setHeader: function () {
      return this;
    },
  };

  const controller = new MemoLinkController(mockService);
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('get', () => {
    it('MemoLinkデータを取得する', async () => {
      const spyList = vi.spyOn(mockService, 'list');
      const spyResJson = vi.spyOn(mockRes, 'json');
      const req = {};

      await controller.get(req as any, mockRes as any);
      expect(spyList).toHaveBeenCalledOnce();
      expect(spyResJson).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('指定のIDでデータを取得する', async () => {
      const req = { params: { id: 2 } };
      const spyFindById = vi.spyOn(mockService, 'findById');

      await controller.getById(req as any, mockRes as any);
      expect(spyFindById).toHaveBeenCalledWith(2);
    });

    it('別のIDでデータを取得する', async () => {
      const req = { params: { id: 5 } };
      const spyFindById = vi.spyOn(mockService, 'findById');

      await controller.getById(req as any, mockRes as any);
      expect(spyFindById).toHaveBeenCalledWith(5);
    });

    it('DBから取得したデータを返す', async () => {
      const returnedValue: MemoLink = {
        id: 2,
        linkUri: '',
        memo: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      vi.mocked(mockService.findById).mockResolvedValue(returnedValue);
      const jsonSpy = vi.spyOn(mockRes, 'json');

      const req = { params: { id: 2 } };
      await controller.getById(req as any, mockRes as any);
      expect(jsonSpy).toBeCalledWith(returnedValue);
    });

    it('IDの指定がなかったらエラーを返す', async () => {
      const req = { params: {}, user: { user_id: '' } };
      try {
        await controller.getById(req as any, mockRes as any);
      } catch (e) {
        expect(e).toStrictEqual(new Error('Target MemoLink Id is undefined'));
      }
    });
  });

  describe('post', () => {
    it('MemoLinkデータを登録する', async () => {
      const spyCreate = vi.spyOn(mockService, 'create');
      const req = {
        body: {
          linkUri: 'https://example.com/',
          memo: 'sample memo',
        },
        user: { user_id: '' },
      };

      const createRecordPayload = {
        id: 0,
        ...req.body,
        userId: '',
        isPublic: false,
      };

      await controller.post(req as any, mockRes as any);
      expect(spyCreate).toHaveBeenCalledExactlyOnceWith(createRecordPayload);
    });

    it('MemoLinkデータを登録したら新しいID情報が返ってくる', async () => {
      const createRecordPayload: MemoLink = {
        id: 2,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        userId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(mockService.create).mockResolvedValue(createRecordPayload);

      const spyResJson = vi.spyOn(mockRes, 'json');
      const spyResStatus = vi.spyOn(mockRes, 'status');
      const req = {
        body: {
          linkUri: 'https://example.com/',
          memo: 'sample memo',
        },
        user: { user_id: '' },
      };
      await controller.post(req as any, mockRes as any);
      expect(spyResJson).toHaveBeenCalledExactlyOnceWith({
        data: createRecordPayload,
      });
      expect(spyResStatus).toHaveBeenCalledWith(201);
    });
  });
});
