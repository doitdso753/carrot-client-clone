import type { UserProfile } from '@/types/user-profile.ts';

export type CommunityItem = {
  authorProfile: UserProfile;
  id: number;
  title: string;
  content?: string;
  category: string;
  location: string;
  tags: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  imageUrl?: string;
};

export type CommunityDetailData = CommunityItem;

export type CommunityComment = {
  content: string;
  createdAt: string;
  id: number;
  likeCount: number;
  location: string;
  nickname: string;
  profileImageUrl?: string;
  replies?: CommunityComment[];
  replyCount: number;
};
