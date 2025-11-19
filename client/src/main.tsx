import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { ConfigProvider, Layout } from 'antd';
import ListLayout from '@root/src/root/ListLayout';
import MemoLinkForm from './component/MemoLinkForm';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import '@fontsource/delius-unicase';
import './global.css';
import AppHeader from './component/AppHeader';

const root = document.getElementById('root')!;
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
  padding: '2em',
  margin: '0 auto',
};

ReactDOM.createRoot(root).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "'Noto Sans JP', 'Roboto', system-ui, Avenir, Helvetica, Arial, sans-serif;",
        },
      }}
    >
      <Layout style={layoutStyle}>
        <AppHeader />
        <div style={mainContainerStyle}>
          <MemoLinkForm />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ListLayout />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Layout>
    </ConfigProvider>
  </StrictMode>
);
