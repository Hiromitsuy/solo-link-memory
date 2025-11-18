import useSWR from 'swr';
import { fetcherJson } from '../controller/fetcher';
import type MemoLink from '@server/model/MemoLinkModel';

export default function ListLayout() {
  const memolinkFetch = useSWR<MemoLink[], string>(
    '/api/memolink',
    fetcherJson
  );
  const memolinks = memolinkFetch.data;

  if (memolinkFetch.error) {
    return (
      <div>
        <p>Data fetch error...orz</p>
      </div>
    );
  }
  console.log(memolinks);
  return (
    <>
      {memolinks &&
        memolinks.map((data, key) => (
          <div key={key}>
            <p>{data.id}</p>
            <p>{data.linkUri}</p>
            <p>{data.memo}</p>
          </div>
        ))}
    </>
  );
}
