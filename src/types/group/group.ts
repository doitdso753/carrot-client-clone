
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

export type GroupItem = {
  albumImageUrls: string[];
  boardMenuItems: readonly string[];
  category: {
    categoryCode: string;
    categoryName: string;
  };
  description: string;
  id: number;
  imageUrl: string;
  location: string;
  memberCount: number;
  members: readonly GroupMember[];
  postCount: number;
  schedules: readonly GroupSchedule[];
  title: string;
};
