import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/noto-sans-jp/300.css';
import '@fontsource/noto-sans-jp/400.css';
import '@fontsource/noto-sans-jp/500.css';
import '@fontsource/noto-sans-jp/700.css';
import '@fontsource/delius-unicase/400.css';
import './global.css';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
