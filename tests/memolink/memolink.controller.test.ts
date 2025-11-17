import MemoLinkController from '@root/src/memolink/memolink.controller';
import MemoLinkService from '@root/src/memolink/memolink.service';
import { Response } from 'express';
import { describe, afterEach, it, expect, vi } from 'vitest';

class MockMemoLinkService extends MemoLinkService {
  constructor() {
    super(null);
  }
  list = () => {
    return null;
  };
  create = () => {
    return null;
  };
}

describe('memolint controller', () => {
  const mockService = new MockMemoLinkService();

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
  };

  const controller = new MemoLinkController(mockService);
  afterEach(() => {
    vi.resetAllMocks();
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

  describe('post', () => {
    it('MemoLinkデータを登録する', async () => {
      const spyCreate = vi.spyOn(mockService, 'create');
      const req = {
        body: {
          linkUri: 'https://example.com/',
          memo: 'sample memo',
        },
      };

      const createRecordPayload = {
        id: 0,
        ...req.body,
        created_at: expect.anything(),
        updated_at: expect.anything(),
      };

      await controller.post(req as any, mockRes as any);
      expect(spyCreate).toHaveBeenCalledExactlyOnceWith(createRecordPayload);
    });

    it('MemoLinkデータを登録したら新しいID情報が返ってくる', async () => {
      const createRecordPayload = {
        id: 2,
        linkUri: 'https://example.com/',
        memo: 'sample memo',
        created_at: 'nowDatetimeString',
        updated_at: 'nowDatetimeString',
      };

      vi.mocked(mockService.create).mockResolvedValue(createRecordPayload);

      const spyResJson = vi.spyOn(mockRes, 'json');
      const spyResStatus = vi.spyOn(mockRes, 'status');
      const req = {
        body: {
          linkUri: 'https://example.com/',
          memo: 'sample memo',
        },
      };
      await controller.post(req as any, mockRes as any);
      expect(spyResJson).toHaveBeenCalledExactlyOnceWith(createRecordPayload);
      expect(spyResStatus).toHaveBeenCalledWith(201);
    });
  });
});
