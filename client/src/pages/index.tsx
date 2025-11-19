import useSWR from 'swr';
import { fetcherJson } from '../controller/fetcher';
import type MemoLink from '@server/model/MemoLinkModel';
import { Col, Flex, Row } from 'antd';
import MemoLinkCard from '../component/MemoLinkCard';
import MemoLinkForm from '../component/MemoLinkForm';
import useAuthContext from '../component/AuthContext';
import { redirect } from 'react-router';

export default function ListLayout() {
  const { authInfo } = useAuthContext();

  console.log(authInfo);
  if (!authInfo) redirect('/signin');

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
    <Flex style={{ marginTop: '2em' }} gap={'2em'} vertical>
      <MemoLinkForm />
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
    </Flex>
  );
}
