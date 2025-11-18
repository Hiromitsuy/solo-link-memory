import { LinkOutlined, SendOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space } from 'antd';
export default function MemoLinkForm() {
  return (
    <Card style={{ padding: '1em' }}>
      <h2 style={{ marginBottom: '1em' }}>リンクをメモ</h2>
      <Form layout="vertical" autoComplete="off">
        <Form.Item name={'linkUri'} label="リンクURL">
          <Space.Compact style={{ width: '100%' }}>
            <Space.Addon>
              <LinkOutlined />
            </Space.Addon>
            <Space.Addon>https://</Space.Addon>
            <Input placeholder="リンクを貼り付け..." allowClear />
          </Space.Compact>
        </Form.Item>
        <Form.Item name={'memo'} label="メモ・感想">
          <Input.TextArea
            variant="outlined"
            placeholder="感想を短く...."
            autoSize={{ minRows: 2, maxRows: 4 }}
          />
          <div
            style={{
              width: '100%',
              textAlign: 'right',
              padding: '0.2em 1em',
            }}
          >
            <label>0 / 255</label>
          </div>
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: 'max-content' }}
        >
          <SendOutlined />
          登録
        </Button>
      </Form>
    </Card>
  );
}
