import { JSDOM } from 'jsdom';

type HeadInfo = {
  siteName: string;
  title: string;
  description: string;
  ogpUri: string;
};

export default async function getHeadOfLink(
  targetUrl: string
): Promise<HeadInfo> {
  try {
    new URL(targetUrl);
  } catch (e) {
    throw new Error('URL Parse Error');
  }
  const dom = await JSDOM.fromURL(targetUrl);
  const doc = dom.window.document;
  const titleTag = doc.querySelector('title')?.text;

  const metaTags = doc.querySelectorAll('meta');
  const metaTagObject: { [key: string]: string | null } = {};
  metaTags.forEach((meta) => {
    const name = meta.getAttribute('name');
    const property = meta.getAttribute('property');
    const content = meta.getAttribute('content');
    if (name) {
      metaTagObject[name] = content;
    } else if (property) {
      metaTagObject[property] = content;
    }
  });

  return {
    title: metaTagObject['og:title'] || titleTag || '',
    description: metaTagObject['og:description'] || '',
    ogpUri: metaTagObject['og:image'] || '',
    siteName: metaTagObject['og:site_name'] || '',
  };
}
