import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from '@/pages/dashboard';
import BuySellPage from '@/pages/buy-sell';
import BuySellDetailPage from '@/pages/buy-sell/buy-sell-detail-page';

function AppRouter(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buy-sell" element={<BuySellPage />} />
      <Route path="/buy-sell/:itemId" element={<BuySellDetailPage />} />
    </Routes>
  );
}

export default AppRouter;
