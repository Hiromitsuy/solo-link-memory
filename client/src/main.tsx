import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import './global.css';
import ListLayout from '@root/src/root/ListLayout';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
