import { describe, it, expect, vi } from 'vitest';
import setupRouting from '../src/routing';
import express from 'express';

describe('routing', () => {
  const mockApp = {
    get: vi.fn(),
    post: vi.fn(),
  };
  setupRouting(mockApp as unknown as express.Express);

  it('exist GET/api/memolinks', () => {
    expect(mockApp.get).toHaveBeenCalledWith(
      '/api/memolink',
      expect.any(Function)
    );
  });
});
