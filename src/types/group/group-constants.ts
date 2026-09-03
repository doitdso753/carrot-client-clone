import type { ComponentType } from 'react';
import {
  CalendarFillIcon,
  HomeFillIcon,
  HotIcon,
  NoticeFillIcon,
} from '@/assets/icons';
import type { UserProfile } from '@/types/user-profile.ts';
import type { GroupCategoryItem, GroupItem } from './group.ts';
import type { GroupMember, GroupPost, GroupSchedule } from './group.ts';
import type { GroupScheduleStatus } from './group.ts';

type GroupCommonMenuCode = 'challenge' | 'home' | 'notice' | 'schedule';

export type GroupMenuItem = {
  code: GroupCommonMenuCode;
  icon: ComponentType;
  label: string;
};

export const GROUP_CATEGORIES = [
  { categoryCode: 'all', categoryName: '전체', id: 1 },
  { categoryCode: 'exercise', categoryName: '운동', id: 2 },
  { categoryCode: 'neighborhood-friend', categoryName: '동네친구', id: 3 },
  { categoryCode: 'outdoor-travel', categoryName: '아웃도어/여행', id: 4 },
  { categoryCode: 'self-development', categoryName: '자기계발', id: 5 },
  { categoryCode: 'family-parenting', categoryName: '가족/육아', id: 6 },
  { categoryCode: 'pet', categoryName: '반려동물', id: 7 },
  { categoryCode: 'food-drink', categoryName: '음식/음료', id: 8 },
  { categoryCode: 'hobby-entertainment', categoryName: '취미/오락', id: 9 },
  { categoryCode: 'reading-humanities', categoryName: '독서/인문학', id: 10 },
  { categoryCode: 'culture-art', categoryName: '문화/예술', id: 11 },
  { categoryCode: 'music-instrument', categoryName: '음악/악기', id: 12 },
  { categoryCode: 'etc', categoryName: '기타', id: 13 },
] as const;

export const GROUP_SEARCH_FILTER_CATEGORIES = GROUP_CATEGORIES.map(
  ({ categoryCode, categoryName }) => ({
    code: categoryCode,
    label: categoryName,
  }),
);

function getGroupCategoryItem(categoryCode: string): GroupCategoryItem {
  const groupCategoryItem = GROUP_CATEGORIES.find(
    (category) => category.categoryCode === categoryCode,
  );

  if (!groupCategoryItem) {
    throw new Error(`존재하지 않는 모임 카테고리입니다: ${categoryCode}`);
  }

  return groupCategoryItem;
}

export const GROUP_BOARD_MENU_ITEMS = [
  { categoryCode: 'all', categoryName: '전체', id: 1 },
  { categoryCode: 'free', categoryName: '자유 게시판', id: 2 },
  { categoryCode: 'notice', categoryName: '공지사항', id: 3 },
  { categoryCode: 'schedule-review', categoryName: '일정후기', id: 4 },
  { categoryCode: 'greeting', categoryName: '가입인사', id: 5 },
] as const;

export const GROUP_COMMON_MENU_ITEMS: readonly GroupMenuItem[] = [
  { code: 'home', icon: HomeFillIcon, label: '홈' },
  { code: 'notice', icon: NoticeFillIcon, label: '공지사항' },
  { code: 'schedule', icon: CalendarFillIcon, label: '모임 일정' },
  { code: 'challenge', icon: HotIcon, label: '챌린지' },
];

export const GROUP_SCHEDULE_STATUS_LABELS: Record<GroupScheduleStatus, string> =
  {
    closed: '마감',
    ended: '종료',
    open: '모집중',
  };

const GROUP_ALBUM_IMAGE_URLS = [
  'https://picsum.photos/seed/group-album-food/400/400',
  'https://picsum.photos/seed/group-album-night/400/400',
  'https://picsum.photos/seed/group-album-steak/400/400',
  'https://picsum.photos/seed/group-album-meal/400/400',
] as const;

const GROUP_MEMBERS: readonly GroupMember[] = [
  {
    id: 1,
    introduction: '',
    location: '경기 수원시 팔달구 인계동',
    name: '함씨/99/인계/남',
    profileImageUrl: 'https://picsum.photos/seed/group-member-ham/96/96',
    role: 'SUPER_HOST',
  },
  {
    id: 2,
    introduction: '저는 개예요,,',
    location: '경기 수원시 권선구 권선2동',
    name: '유화/00/여/권선',
    profileImageUrl: 'https://picsum.photos/seed/group-member-yuhwa/96/96',
    role: 'MANAGER',
  },
  {
    id: 3,
    introduction: '',
    location: '경기 수원시 팔달구 인계동',
    name: '포포/57/남/인계',
    profileImageUrl: 'https://picsum.photos/seed/group-member-popo/96/96',
    role: 'MANAGER',
  },
  {
    id: 4,
    introduction: '',
    location: '경기 안양시 만안구 안양6동',
    name: '안양/00/남/안양',
    profileImageUrl: 'https://picsum.photos/seed/group-member-anyang/96/96',
    role: 'MEMBER',
  },
];

const GROUP_SCHEDULES: readonly GroupSchedule[] = [
  {
    currentMemberCount: 2,
    date: '2026-08-27',
    id: 1,
    isPublic: false,
    maximumMemberCount: 4,
    status: 'ended',
    time: '오후 8:00',
    title: '모임에만 공개된 일정이에요.',
  },
  {
    currentMemberCount: 2,
    date: '2026-08-25',
    id: 2,
    isPublic: true,
    maximumMemberCount: 4,
    status: 'ended',
    time: '오후 9:00',
    title: '광교호수공원 걷기',
  },
  {
    currentMemberCount: 6,
    date: '2026-08-24',
    id: 3,
    isPublic: true,
    maximumMemberCount: 10,
    status: 'ended',
    time: '오후 8:30',
    title: '안양역 무엇이든',
  },
  {
    currentMemberCount: 4,
    date: '2026-08-26',
    id: 4,
    isPublic: false,
    maximumMemberCount: 10,
    status: 'ended',
    time: '오후 3:30',
    title: '모임에만 공개된 일정이에요.',
  },
  {
    currentMemberCount: 5,
    date: '2026-08-25',
    id: 5,
    isPublic: false,
    maximumMemberCount: 12,
    status: 'ended',
    time: '오후 8:00',
    title: '모임에만 공개된 일정이에요.',
  },
];

const GROUP_POST_AUTHOR: UserProfile = {
  location: '경기 수원시 권선구',
  nickname: '유화/00/여/권선',
  profileImageUrl: 'https://picsum.photos/seed/group-member-yuhwa/96/96',
  warmth: 36.5,
};

const GROUP_POSTS: readonly GroupPost[] = [
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content: '',
    createdAt: '2026-08-31T12:00:00+09:00',
    id: 1,
    imageUrl: 'https://picsum.photos/seed/group-post-wine/216/216',
    isPublic: true,
    likeCount: 1,
    location: GROUP_POST_AUTHOR.nickname,
    tags: '',
    title: '와인 부은거 아님 피뚝뚝 크~',
    viewCount: 12,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 2,
    content: '',
    createdAt: '2026-08-30T12:00:00+09:00',
    id: 2,
    imageUrl: 'https://picsum.photos/seed/group-post-meat/216/216',
    isPublic: true,
    likeCount: 1,
    location: GROUP_POST_AUTHOR.nickname,
    tags: '',
    title: '정체는 콩불임',
    viewCount: 18,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '추추/00/남/용인',
    },
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 4,
    content: '',
    createdAt: '2026-08-28T12:00:00+09:00',
    id: 3,
    isPublic: false,
    likeCount: 0,
    location: '추추/00/남/용인',
    tags: '',
    title: '@안양/00/남/안양 @추추/00/남/용인 @연두/02/여/구운',
    viewCount: 25,
  },
];

export const GROUP_ITEMS = [
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description: '강남 지역에서 함께 노래하고 즐겁게 교류하는 싱글 모임입니다.',
    id: 1,
    imageUrl: 'https://picsum.photos/seed/group-singles-36-54/160/160',
    location: '역삼동',
    memberCount: 228,
    title: '🌸오늘어때36-54강남서초 돌싱싱글💖',
  },
  {
    category: {
      categoryCode: 'food-drink',
      categoryName: '음식/음료',
    },
    description: '맛있는 음식을 함께 먹고 새로운 맛집을 찾아다니는 모임입니다.',
    id: 2,
    imageUrl: 'https://picsum.photos/seed/group-delicious-day/160/160',
    location: '역삼동',
    memberCount: 59,
    title: '🔥 맛있는하루 함께먹어요 💪',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '강남과 서초를 중심으로 다양한 취미와 일상을 함께 나누는 싱글 모임입니다.',
    id: 3,
    imageUrl: 'https://picsum.photos/seed/group-singles-75-95/160/160',
    location: '역삼동',
    memberCount: 312,
    title: '[강남싱글즈] 75-95💞강남.서초.송파',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '편안하게 대화하며 새로운 친구를 만들 수 있는 강남·서초 모임입니다.',
    id: 4,
    imageUrl: 'https://picsum.photos/seed/group-friends-86-72/160/160',
    location: '역삼동',
    memberCount: 130,
    title: '86~72강남서초송파 기대를하는러오세요',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '강남과 서초에 거주하는 86~99년생이 맛집과 취미를 함께 즐기는 모임입니다.',
    id: 5,
    imageUrl: 'https://picsum.photos/seed/group-neighborhood-86-99/160/160',
    location: '역삼동',
    memberCount: 180,
    title: '86~99♡강남서초거주자 동네친구 강서다♡',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '퇴근 후 가볍게 만나 이야기하고 서로의 일상을 나누는 3040 모임입니다.',
    id: 6,
    imageUrl: 'https://picsum.photos/seed/group-3040-alone/160/160',
    location: '역삼동',
    memberCount: 90,
    title: '3040 혼자는 싫어',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '맛있는 음식과 편안한 대화를 좋아하는 사람들이 모이는 동네 모임입니다.',
    id: 7,
    imageUrl: 'https://picsum.photos/seed/group-mate/160/160',
    location: '역삼동',
    memberCount: 202,
    title: '메이트',
  },
  {
    category: { categoryCode: 'exercise', categoryName: '운동' },
    description:
      '강남에서 함께 움직이며 건강한 습관과 즐거운 시간을 만드는 모임입니다.',
    id: 8,
    imageUrl: 'https://picsum.photos/seed/group-move-moment/160/160',
    location: '논현동',
    memberCount: 53,
    title: '[2030] Move Moment',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '강남권 30~40대 싱글들이 취미와 친목 활동을 함께하는 모임입니다.',
    id: 9,
    imageUrl: 'https://picsum.photos/seed/group-gangnam-singles/160/160',
    location: '역삼동',
    memberCount: 183,
    title: '강남돈뜰 30~40 싱글.솔로.돌싱',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '서울과 강남 지역의 2030이 공연과 맛집 등 다양한 취미를 함께 즐기는 모임입니다.',
    id: 10,
    imageUrl: 'https://picsum.photos/seed/group-seoul-gangnam/160/160',
    location: '논현동',
    memberCount: 277,
    title: '[2030] 서울/강남 오늘은 설렘💗',
  },
  {
    category: {
      categoryCode: 'neighborhood-friend',
      categoryName: '동네친구',
    },
    description:
      '강남과 서초, 송파에서 맛집과 카페를 찾아다니며 친목을 쌓는 모임입니다.',
    id: 11,
    imageUrl: 'https://picsum.photos/seed/group-gang-song/160/160',
    location: '역삼동',
    memberCount: 116,
    title: '강송모 (강남서초송파 동네친구 모임)',
  },
  {
    category: {
      categoryCode: 'exercise',
      categoryName: '운동',
    },
    description:
      '매일 꾸준히 달리며 서로의 운동 기록과 러닝 정보를 나누는 모임입니다.',
    id: 12,
    imageUrl: 'https://picsum.photos/seed/group-daily-running/160/160',
    location: '역삼동',
    memberCount: 473,
    title: '매일 동네런기 인증 챌린지',
  },
  {
    category: { categoryCode: 'exercise', categoryName: '운동' },
    description:
      '신당동과 남산 주변을 주 2회 함께 달리는 초보 러닝 모임입니다.',
    id: 13,
    imageUrl: 'https://picsum.photos/seed/sindang-group-running/160/160',
    location: '신당동',
    memberCount: 38,
    title: '신당동 퇴근런 크루',
  },
  {
    category: { categoryCode: 'food-drink', categoryName: '음식/음료' },
    description: '신당동의 숨은 맛집과 카페를 함께 찾아다니는 모임입니다.',
    id: 14,
    imageUrl: 'https://picsum.photos/seed/sindang-group-food/160/160',
    location: '신당동',
    memberCount: 64,
    title: '신당 맛집 탐험대',
  },
  {
    category: {
      categoryCode: 'reading-humanities',
      categoryName: '독서/인문학',
    },
    description: '한 달에 한 권을 읽고 편안하게 생각을 나누는 독서 모임입니다.',
    id: 15,
    imageUrl: 'https://picsum.photos/seed/sindang-group-book/160/160',
    location: '신당동',
    memberCount: 27,
    title: '신당동 한달한권 북클럽',
  },
  {
    category: { categoryCode: 'pet', categoryName: '반려동물' },
    description:
      '반려견과 함께 안전하게 산책하고 정보를 나누는 이웃 모임입니다.',
    id: 16,
    imageUrl: 'https://picsum.photos/seed/sindang-group-dog/160/160',
    location: '신당동',
    memberCount: 45,
    title: '신당 댕댕이 산책친구',
  },
  {
    category: {
      categoryCode: 'hobby-entertainment',
      categoryName: '취미/오락',
    },
    description:
      '주말마다 가볍게 보드게임을 즐기며 새로운 이웃을 만나는 모임입니다.',
    id: 17,
    imageUrl: 'https://picsum.photos/seed/sindang-group-boardgame/160/160',
    location: '신당동',
    memberCount: 31,
    title: '신당 주말 보드게임 모임',
  },
].map((item) => ({
  ...item,
  albumImageUrls: [...GROUP_ALBUM_IMAGE_URLS],
  boardMenuItems: GROUP_BOARD_MENU_ITEMS,
  category: getGroupCategoryItem(item.category.categoryCode),
  members: GROUP_MEMBERS,
  postCount: 70,
  posts: GROUP_POSTS,
  schedules: GROUP_SCHEDULES,
})) satisfies readonly GroupItem[];
