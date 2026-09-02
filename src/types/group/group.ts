
export type GroupMemberRole = 'SUPER_HOST' | 'MANAGER' | 'MEMBER';

export type GroupMember = {
  id: number;
  introduction?: string;
  location: string;
  name: string;
  profileImageUrl: string;
  role: GroupMemberRole;
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
  title: string;
};
