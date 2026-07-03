import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from '@/pages/dashboard';
import BuySellPage from '@/pages/buy-sell';

function AppRouter(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buy-sell" element={<BuySellPage />} />
    </Routes>
  );
}

export default AppRouter;
