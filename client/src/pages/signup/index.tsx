import { auth } from '@/controller/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Navigate, redirect } from 'react-router';
import useAuthContext from '@/component/AuthContext';

type SignUpFieldType = {
  email?: string;
  password?: string;
  confirm?: string;
};
export default function SignUp() {
  const [form] = Form.useForm();
  const [isSiginError, setSigupError] = useState(false);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const { authInfo } = useAuthContext();

  const handleSubmit = async (values: SignUpFieldType) => {
    const { email, password } = values;
    if (!email || !password) return;
    if (password === email) return;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      return redirect('/');
    } catch {
      setSigupError(true);
    }
  };

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  if (!authInfo) return <Navigate to={'/'} />;

  return (
    <Card style={{ margin: '2em', width: '100%' }}>
      <Typography.Title level={2}>サインアップ</Typography.Title>
      <Form<SignUpFieldType>
        form={form}
        name="signup"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ email: '', password: '', confirm: '' }}
        autoComplete="off"
        onFinish={handleSubmit}
        style={{ width: '100%', maxWidth: 500 }}
      >
        <Form.Item required name={'email'} label="メールアドレス">
          <Input type="email" required />
        </Form.Item>
        <Form.Item required name={'password'} label="パスワード">
          <Input type="password" name="password" required />
        </Form.Item>
        <Form.Item required name={'confirm'} label="パスワード（確認用）">
          <Input type="password" name="confirm" required />
        </Form.Item>

        <Row>
          <Col span={8}></Col>
          <Col span={12}>
            <Flex vertical gap={4}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: 'max-content' }}
                disabled={!submittable}
              >
                ログイン
              </Button>
              {isSiginError && (
                <Typography.Text type="danger">
                  ログインに失敗しました。
                </Typography.Text>
              )}
              <Typography.Text>
                ユーザ登録は<Link to={'/signup'}>こちら</Link>から
              </Typography.Text>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
