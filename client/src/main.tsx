import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from 'antd';
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
import './global.css';

const root = document.getElementById('root')!;
const layoutStyle: React.CSSProperties = {
  width: '100vw',
  height: 'max-content',
  backgroundColor: '#fafafa',
  fontFamily: 'NotoSans, Roboto, san-serif',
};

const mainContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: 980,
  height: '100%',
  padding: '2em',
  margin: 'auto',
};

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Layout style={layoutStyle}>
      <header>あとで作る</header>
      <div style={mainContainerStyle}>
        <MemoLinkForm />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ListLayout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Layout>
  </StrictMode>
);
