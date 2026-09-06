import type { CommunityItem } from '@/types/community';

export type GroupMemberRole = 'SUPER_HOST' | 'MANAGER' | 'MEMBER';

export type GroupMember = {
  id: number;
  introduction?: string;
  location: string;
  name: string;
  profileImageUrl: string;
  role: GroupMemberRole;
};

export type GroupScheduleStatus = 'closed' | 'ended' | 'open';

export type GroupSchedule = {
  currentMemberCount: number;
  date: string;
  id: number;
  isPublic: boolean;
  maximumMemberCount: number;
  status: GroupScheduleStatus;
  time: string;
  title: string;
};

export type GroupPostContentItem =
  | {
      text: string;
      type: 'text';
    }
  | {
      imageUrl: string;
      type: 'picture';
    }
  | {
      schedule: GroupSchedule;
      type: 'schedule';
    }
  | {
      challenge: {
        metadata: string;
        title: string;
      };
      type: 'challenge';
    };

export type GroupPost = Omit<CommunityItem, 'category' | 'tags'> & {
  category: GroupCategoryItem;
  contentItems?: readonly GroupPostContentItem[];
  isPublic: boolean;
};

export type GroupCategoryItem = {
  categoryCode: string;
  categoryName: string;
  id: number;
};

export type GroupItem = {
  albumImageUrls: string[];
  boardMenuItems: readonly GroupCategoryItem[];
  category: GroupCategoryItem;
  description: string;
  id: number;
  imageUrl: string;
  location: string;
  memberCount: number;
  members: readonly GroupMember[];
  postCount: number;
  posts: readonly GroupPost[];
  schedules: readonly GroupSchedule[];
  title: string;
};
