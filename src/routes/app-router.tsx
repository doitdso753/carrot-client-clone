import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from '@/pages/dashboard';

function AppRouter(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
    </Routes>
  );
}

export default AppRouter;
