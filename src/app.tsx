import React, { type ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import '@/assets/styles/index.css';
import RegionProvider from '@/provider/region-provider.tsx';
import AppRouter from '@/routes/app-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

function App(): ReactNode {
  return (
    <RegionProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </RegionProvider>
  );
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
