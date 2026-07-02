import type { ReactNode } from 'react';
import CategoryGrid from '@/components/dashboard/category-grid.tsx';
import HeroSearch from '@/components/dashboard/hero-search.tsx';
import NeighborhoodList from '@/components/dashboard/neighborhood-list.tsx';
import PromotionBanner from '@/components/dashboard/promotion-banner.tsx';
import {
  CATEGORIES,
  HERO_SEARCH_KEYWORDS,
  NEIGHBORHOODS,
  POPULAR_KEYWORDS,
} from '@/types/constants.ts';

export default function DashboardContent(): ReactNode {
  return (
    <main className="dashboard-wrapper flex flex-1 flex-col items-center pt-32 sm:pt-40 lg:pt-52">
      <HeroSearch
        categories={CATEGORIES}
        heroKeywords={HERO_SEARCH_KEYWORDS}
        popularKeywords={POPULAR_KEYWORDS}
      />
      <PromotionBanner />
      <CategoryGrid categories={CATEGORIES} />
      <NeighborhoodList neighborhoods={NEIGHBORHOODS} />
    </main>
  );
}
