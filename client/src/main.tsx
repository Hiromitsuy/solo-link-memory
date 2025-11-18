import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './global.css';
import ListLayout from '@root/src/root/ListLayout';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/noto-sans/300.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/500.css';
import '@fontsource/noto-sans/700.css';
import Container from '@mui/material/Container';
import MemoLinkForm from './component/MemoLinkForm';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <Container maxWidth="md">
      <MemoLinkForm />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListLayout />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </StrictMode>
);
