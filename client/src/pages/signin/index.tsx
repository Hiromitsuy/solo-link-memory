import { auth } from '@/controller/auth';
import useAuthContext from '@/component/AuthContext';
import { Button, Card, Col, Flex, Form, Input, Row, Typography } from 'antd';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link, Navigate, redirect } from 'react-router';

type SignInFieldType = {
  email?: string;
  password?: string;
};

export default function SignIn() {
  const [form] = Form.useForm();
  const [isSiginError, setSiginError] = useState(false);
  const [submittable, setSubmittable] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const { authInfo } = useAuthContext();

  const handleSubmit = async (values: SignInFieldType) => {
    const { email, password } = values;
    if (!email || !password) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return redirect('/');
    } catch {
      setSiginError(true);
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
      <Typography.Title level={2}>ログイン</Typography.Title>
      <Form<SignInFieldType>
        form={form}
        name="signin"
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
