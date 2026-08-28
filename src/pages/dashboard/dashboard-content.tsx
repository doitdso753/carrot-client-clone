import type { ReactNode } from 'react';
import CategoryGrid from '@/components/dashboard/category-grid.tsx';
import HeroSearch from '@/components/dashboard/hero-search.tsx';
import PopularCommunity from '@/components/dashboard/popular-community.tsx';
import PromotionBanner from '@/components/dashboard/promotion-banner.tsx';
import { CATEGORIES } from '@/types/category';
import { HERO_SEARCH_KEYWORDS, POPULAR_KEYWORDS } from '@/types/dashboard';

export default function DashboardContent(): ReactNode {
  return (
    <main className="dashboard-wrapper flex flex-1 flex-col items-center">
      <HeroSearch
        categories={CATEGORIES}
        heroKeywords={HERO_SEARCH_KEYWORDS}
        popularKeywords={POPULAR_KEYWORDS}
      />
      <PromotionBanner />
      <CategoryGrid categories={CATEGORIES} />
      <PopularCommunity />
    </main>
  );
}
