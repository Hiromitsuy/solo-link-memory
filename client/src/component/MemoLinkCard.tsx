import type MemoLink from '@server/model/MemoLinkModel';
import { Card, Flex, Image, Tag, Typography } from 'antd';

type Props = {
  memolink: MemoLink;
};

export default function MemoLinkCard({ memolink }: Props) {
  return (
    <Card style={{ marginBottom: '1em' }}>
      <Typography.Title level={3}>{memolink.linkTitle}</Typography.Title>
      <Flex gap="middle">
        <Image
          src={
            memolink.ogpUri ||
            `https://placehold.jp/150x150.png?text=${memolink.linkTitle}`
          }
          style={{
            objectFit: 'cover',
            width: '100%',
            maxWidth: 150,
            height: 150,
            border: '1px solid #ccc',
            borderRadius: 8,
          }}
        />
        <Flex gap={4} vertical>
          <Typography.Link>{new URL(memolink.linkUri).origin}</Typography.Link>
          <Typography.Text style={{ flex: 1 }}>{memolink.memo}</Typography.Text>
          {memolink.isPublic ? (
            <Tag color="green" style={{ width: 'max-content' }}>
              公開
            </Tag>
          ) : (
            <Tag color="blue" style={{ width: 'max-content' }}>
              自分だけ
            </Tag>
          )}
        </Flex>
      </Flex>
    </Card>
  );
}
