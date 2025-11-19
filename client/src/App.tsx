import { BrowserRouter, Route, Routes } from 'react-router';
import { ConfigProvider, Flex, Layout } from 'antd';
import AppHeader from '@/component/AppHeader';
import ListLayout from '@/pages';
import AuthProvider from './component/AuthProvider';
import SignUp from '@/pages/signup';
import SignIn from './pages/signin';
import RequireAuth from './component/RequireAuth';

const layoutStyle: React.CSSProperties = {
  width: '100vw',
  height: 'max-content',
  minHeight: '100%',
  fontFamily: 'NotoSans, Roboto, san-serif',
};

const mainContainerStyle: React.CSSProperties = {
  width: '100%',
  height: 'max-content',
  maxWidth: 980,
  margin: '0 auto',
};

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "'Noto Sans JP', 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;",
        },
      }}
    >
      <AuthProvider>
        <Layout style={layoutStyle}>
          <AppHeader />
          <Flex style={mainContainerStyle}>
            <BrowserRouter>
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <ListLayout />
                    </RequireAuth>
                  }
                />
              </Routes>
            </BrowserRouter>
          </Flex>
        </Layout>
      </AuthProvider>
    </ConfigProvider>
  );
}
