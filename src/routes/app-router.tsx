import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router';
import DashboardPage from '@/pages/dashboard';
import BuySellPage from '@/pages/buy-sell';
import BuySellDetailPage from '@/pages/buy-sell/buy-sell-detail-page';
import CarsPage from '@/pages/cars';
import CarsDetailPage from '@/pages/cars/cars-detail-page';
import CommunityPage from '@/pages/community';
import CommunityDetailPage from '@/pages/community/community-detail-page.tsx';
import GroupPage from '@/pages/group';
import GroupBoardDetailPage from '@/pages/group/group-board-detail-page.tsx';
import GroupBoardPage from '@/pages/group/group-board-page.tsx';
import GroupDetailPage from '@/pages/group/group-detail-page.tsx';
import LocalProfilePage from '@/pages/local-profile';
import LocalProfileDetailPage from '@/pages/local-profile/local-profile-detail-page.tsx';
import LocalProfileNewsDetailPage from '@/pages/local-profile/local-profile-news-detail-page.tsx';
import PreparingServicePage from '@/pages/preparing-service-page.tsx';

function AppRouter(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/buy-sell" element={<BuySellPage />} />
      <Route path="/buy-sell/:itemId" element={<BuySellDetailPage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/cars/:itemId" element={<CarsDetailPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/:id" element={<CommunityDetailPage />} />
      <Route path="/group" element={<GroupPage />} />
      <Route path="/group/:itemId" element={<GroupDetailPage />} />
      <Route
        path="/group/:itemId/board/:categoryCode"
        element={<GroupBoardPage />}
      />
      <Route
        path="/group/:itemId/board/:categoryCode/:postId"
        element={<GroupBoardDetailPage />}
      />
      <Route path="/jobs/*" element={<PreparingServicePage />} />
      <Route path="/realty/*" element={<PreparingServicePage />} />
      <Route path="/cafe/*" element={<PreparingServicePage />} />
      <Route path="/local-profile" element={<LocalProfilePage />} />
      <Route
        path="/local-profile/:itemId"
        element={<LocalProfileDetailPage />}
      />
      <Route
        path="/local-profile/:itemId/news/:newsId"
        element={<LocalProfileNewsDetailPage />}
      />
    </Routes>
  );
}

export default AppRouter;
