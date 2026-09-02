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
  postCount: number;
  title: string;
};
