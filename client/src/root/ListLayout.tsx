import useSWR from 'swr';
import { fetcherJson } from '../controller/fetcher';
import type MemoLink from '@server/model/MemoLinkModel';
import { Col, Row } from 'antd';
import MemoLinkCard from '../component/MemoLinkCard';
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
  return (
    <div style={{ marginTop: '2em' }}>
      <Row gutter={16}>
        {memolinks &&
          memolinks.map((data, key) => (
            <Col
              key={key}
              className="gutter-row"
              xs={24}
              sm={24}
              md={24}
              lg={12}
              xl={12}
            >
              <MemoLinkCard memolink={data} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
