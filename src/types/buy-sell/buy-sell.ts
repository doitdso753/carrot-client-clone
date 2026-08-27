import type { UserProfile } from '@/types/user-profile.ts';

export type BuySellItemStatusCode = 'selling' | 'reserved' | 'sold';

export type BuySellItem = {
  id: number;
  title: string;
  price: number;
  location: string;
  createdAt: string;
  imageUrl: string;
  status?: BuySellItemStatusCode;
  serviceCategoryCode?: string;
  serviceCategoryText?: string;
  categoryCode?: string;
  categoryText?: string;
  description?: string;
  imageUrls?: string[];
  seller?: UserProfile;
  stats?: {
    chatCount: number;
    favoriteCount: number;
    viewCount: number;
  };
};
