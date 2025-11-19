import useSWR from 'swr';
import type MemoLink from '@server/model/MemoLinkModel';
import { Col, Flex, Row } from 'antd';
import MemoLinkCard from '../component/MemoLinkCard';
import MemoLinkForm from '../component/MemoLinkForm';
import useAuthContext from '../component/AuthContext';

export default function ListLayout() {
  const { authInfo } = useAuthContext();
  const memolinkFetch = useSWR<MemoLink[], string>(
    '/api/memolink',
    async (url: string) => {
      const token = await authInfo?.getIdToken();
      return fetch(url, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then((res) => res.json());
    }
  );

  if (memolinkFetch.error) {
    return (
      <div>
        <p>Data fetch error...orz</p>
      </div>
    );
  }

  const memolinks = memolinkFetch.data;

  return (
    <Flex style={{ marginTop: '2em', width: '100%' }} gap={'2em'} vertical>
      <MemoLinkForm />
      <Row gutter={16}>
        {memolinks &&
          memolinks.length > 0 &&
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
