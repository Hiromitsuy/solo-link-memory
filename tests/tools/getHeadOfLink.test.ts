import getHeadOfLink from '@root/src/tools/getHeadOfLink';
import { describe, expect, it, vi } from 'vitest';

import { JSDOM } from 'jsdom';
vi.mock('jsdom');
const mockDom = { fromURL: vi.fn() };

const htmlStringFormat =
  '<!doctype html><html lang="en"><head>{HEAD}</head><body></body></html>';

describe('getHeadOfLink', () => {
  const mockJSDomInstance = {
    window: {
      document: {
        querySelector: vi.fn().mockImplementation((selector: string) => {
          return { text: '' };
        }),
        querySelectorAll: vi.fn().mockImplementation(() => []),
      },
    },
  };
  it('should access target link and get Head information', async () => {
    const fetchSpy = vi
      .spyOn(JSDOM, 'fromURL')
      .mockResolvedValue(mockJSDomInstance as any);
    await getHeadOfLink('sample/url');

    expect(fetchSpy).toBeCalledWith('sample/url');
    //   'https://imageflux.sakura.ad.jp/column/ogp-images/',
  });

  it('get title in <title> on target page, description and ogpUri is not defined.', async () => {
    const definedInTitleTag = htmlStringFormat.replace(
      '{HEAD}',
      '<title>Example Title</title>'
    );
    vi.mocked(JSDOM.fromURL).mockResolvedValue(mockJSDomInstance as any);
    vi.mocked(mockJSDomInstance.window.document.querySelector).mockReturnValue({
      text: 'Example Title',
    });
    vi.mocked(
      mockJSDomInstance.window.document.querySelectorAll
    ).mockReturnValue([]);
    const { title, description, ogpUri, siteName } =
      await getHeadOfLink('http://example.com');

    expect(title).toBe('Example Title');
    expect(description).toBe('');
    expect(ogpUri).toBe('');
    expect(siteName).toBe('');
  });

  it('get og property in meta tags', async () => {
    const definedInTitleTag = htmlStringFormat.replace(
      '{HEAD}',
      '<meta property="og:site_name" content="さくらインターネット" />' +
        '<meta property="og:title" content=" OGP画像とは？設定方法や表示の確認方法・推奨サイズを解説" />' +
        '<meta property="og:url" content=" https://cloud.sakura.ad.jp/column/ogp/" />' +
        '<meta property="og:image" content=" https://cloud.sakura.ad.jp/column/ogp.jpg" />' +
        '<meta property="og:description" content="description" />'
    );
    vi.mocked(JSDOM.fromURL).mockResolvedValue(mockJSDomInstance as any);
    const metadata = [
      { name: '', property: 'og:site_name', content: '' },
      {
        name: '',
        property: 'og:title',
        content: 'OGP画像とは？設定方法や表示の確認方法・推奨サイズを解説',
      },
      {
        name: '',
        property: 'og:image',
        content: 'https://cloud.sakura.ad.jp/column/ogp.jpg',
      },
      {
        name: '',
        property: 'og:description',
        content: 'description',
      },
    ];
    vi.mocked(
      mockJSDomInstance.window.document.querySelectorAll
    ).mockReturnValue(
      metadata.map((meta) => {
        return {
          getAttribute: vi.fn().mockImplementation((p) => meta[p]),
        };
      })
    );

    const { title, description, ogpUri } =
      await getHeadOfLink('http://example.com');

    expect(title).toBe(
      'OGP画像とは？設定方法や表示の確認方法・推奨サイズを解説'
    );
    expect(description).toBe('description');
    expect(ogpUri).toBe('https://cloud.sakura.ad.jp/column/ogp.jpg');
  });
});
