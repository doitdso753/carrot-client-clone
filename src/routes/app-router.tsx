import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from '@/pages/dashboard';
import BuySellPage from '@/pages/buy-sell';
import BuySellDetailPage from '@/pages/buy-sell/buy-sell-detail-page';
import LocalProfilePage from '@/pages/local-profile';

function AppRouter(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buy-sell" element={<BuySellPage />} />
      <Route path="/buy-sell/:itemId" element={<BuySellDetailPage />} />
      <Route path="/local-profile" element={<LocalProfilePage />} />
    </Routes>
  );
}

export default AppRouter;
