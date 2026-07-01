import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@/assets/styles/index.css';
import AppRouter from '@/routes/app-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

function App(): ReactNode {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
