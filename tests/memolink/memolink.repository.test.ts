import { describe, it, expect, vi } from 'vitest';
import createMemoLinkRepository from '../../src/memolink/memolink.repository';
import { afterEach, beforeEach } from 'node:test';
import { Knex } from 'knex';

describe('memolink reposotory', () => {
  const knexMock = {
    select: function () {
      return this;
    },
    from: function () {
      return this;
    },
    limit: function (limit: number) {
      return this;
    },
  };
  let reposotory = createMemoLinkRepository(knexMock as unknown as Knex);

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
    it('');
  });
});
