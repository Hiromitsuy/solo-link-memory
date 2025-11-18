import type MemoLink from '@server/model/MemoLinkModel';
import { Card, Col, Flex, Image, Row, Typography } from 'antd';

type Props = {
  memolink: MemoLink;
};

export default function MemoLinkCard({ memolink }: Props) {
  return (
    <Card style={{ marginBottom: '1em' }}>
      <Typography.Title level={3}>リンク先タイトル</Typography.Title>
      <Row>
        <Col span={12}>
          <Image src="https://placehold.jp/150x150.png" />
        </Col>
        <Col span={12}>
          <Flex gap={2} vertical>
            <Typography.Link>
              {new URL(memolink.linkUri).origin}
            </Typography.Link>
            <Typography.Text>{memolink.memo}</Typography.Text>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
}
