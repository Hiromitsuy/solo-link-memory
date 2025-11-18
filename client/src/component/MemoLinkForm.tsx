import { LinkOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
import { useReducer } from 'react';
import useSWRMutation from 'swr/mutation';

type MemoLinkField = {
  linkUri: string;
  memo: string;
};

const initForm: MemoLinkField = {
  linkUri: '',
  memo: '',
};

type FormReducerAction = {
  name: string;
  value: string;
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

const formReducer = (
  prevStatus: MemoLinkField,
  { name, value }: FormReducerAction
) => {
  switch (name) {
    case 'clear':
      console.log('クリアされました。');
      return { linkUri: '', memo: '' };
    case 'linkUri':
    case 'memo':
      return { ...prevStatus, [name]: value };
    default:
      throw new Error('undefined target');
  }
};

const validationForm = (data: MemoLinkField) => {
  if (!data.linkUri) return false;
  try {
    new URL(data.linkUri);
  } catch {
    return false;
  }
  return true;
};

export default function MemoLinkField() {
  const [memolink, dispatch] = useReducer(formReducer, initForm);
  const { trigger, isMutating } = useSWRMutation('/api/memolink', postRequest);

  const isValidFormData = validationForm(memolink);
  const onSubmit = () =>
    trigger(memolink).then(() => dispatch({ name: 'clear', value: '' }));

  console.log(memolink);

  return (
    <Card style={{ padding: '1em' }}>
      <h2 style={{ marginBottom: '1em' }}>リンクをメモ</h2>
      <Form
        layout="vertical"
        autoComplete="off"
        initialValues={{ ...initForm }}
        onFinish={onSubmit}
      >
        <Form.Item name={'linkUri'} label="リンクURL">
          <Space.Compact style={{ width: '100%' }}>
            <Space.Addon>
              <LinkOutlined />
            </Space.Addon>
            <Input
              name="linkUri"
              placeholder="リンクを貼り付け..."
              allowClear
              value={memolink.linkUri}
              onChange={(e) =>
                dispatch({ name: e.target.name, value: e.target.value })
              }
            />
          </Space.Compact>
        </Form.Item>
        <Form.Item name={'memo'} label="メモ・感想">
          <Input.TextArea
            name="memo"
            placeholder="読んだ時の気持ちを残しましょう..."
            autoSize={{ minRows: 2, maxRows: 4 }}
            value={memolink.memo}
            onChange={(e) =>
              dispatch({ name: e.target.name, value: e.target.value })
            }
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
          disabled={!isValidFormData}
        >
          <SendOutlined />
          登録
        </Button>
      </Form>
    </Card>
  );
}
