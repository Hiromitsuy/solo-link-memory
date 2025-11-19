import { LinkOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';

type MemoLinkField = {
  linkUri: string;
  memo: string;
};

const initForm: MemoLinkField = {
  linkUri: '',
  memo: '',
};

const postRequest = (url: string, { arg }: { arg: MemoLinkField }) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  })
    .then((res) => res.json())
    .catch((e) => console.error(e));
};

export default function MemoLinkField() {
  const [form] = Form.useForm();
  const { trigger, isMutating } = useSWRMutation('/api/memolink', postRequest);

  const onSubmit = (values: MemoLinkField) => trigger(values);

  useEffect(() => {
    if (!isMutating) form.resetFields();
  }, [isMutating, form]);

  return (
    <Card style={{ padding: '1em' }}>
      <h2 style={{ marginBottom: '1em' }}>リンクをメモ</h2>
      <Form<MemoLinkField>
        form={form}
        layout="vertical"
        autoComplete="off"
        initialValues={{ ...initForm }}
        onFinish={onSubmit}
      >
        <Form.Item<MemoLinkField>
          name="linkUri"
          label="リンクURL"
          rules={[
            {
              required: true,
              message: '記録したいリンク先URLを追加してください。',
            },
          ]}
        >
          <Space.Compact style={{ width: '100%' }}>
            <Space.Addon>
              <LinkOutlined />
            </Space.Addon>
            <Input
              name="linkUri"
              placeholder="リンクを貼り付け..."
              allowClear
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item<MemoLinkField> name="memo" label="メモ・感想">
          <Input.TextArea
            name="memo"
            placeholder="読んだ時の気持ちを残しましょう..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            allowClear
            showCount
            maxLength={255}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 'max-content' }}
          loading={isMutating}
        >
          <SendOutlined />
          登録
        </Button>
      </Form>
    </Card>
  );
}
