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
import type { GroupPostComment } from './group.ts';
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
    commentCount: 3,
    content: '와인 부은거 아님 피뚝뚝 크~',
    contentItems: [
      {
        text: '와인 부은거 아님 피뚝뚝 크~\n오랜만에 다 같이 먹으니까 더 맛있었어요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-wine-detail-1/640/640',
        type: 'picture',
      },
      {
        schedule: GROUP_SCHEDULES[0],
        type: 'schedule',
      },
      {
        challenge: {
          metadata: '챌린지 · 8명 참여 중',
          title: '이번 주 맛집 인증 챌린지',
        },
        type: 'challenge',
      },
    ],
    createdAt: '2026-08-31T12:00:00+09:00',
    id: 1,
    imageUrl: 'https://picsum.photos/seed/group-post-wine/216/216',
    isPublic: true,
    likeCount: 1,
    location: GROUP_POST_AUTHOR.nickname,
    title: '와인 부은거 아님 피뚝뚝 크~',
    viewCount: 12,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content: '정체는 콩불임',
    contentItems: [
      {
        text: '정체는 콩불임\n다음엔 맵기 한 단계 낮춰도 좋을 것 같아요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-meat-detail/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-30T12:00:00+09:00',
    id: 2,
    imageUrl: 'https://picsum.photos/seed/group-post-meat/216/216',
    isPublic: true,
    likeCount: 1,
    location: GROUP_POST_AUTHOR.nickname,
    title: '정체는 콩불임',
    viewCount: 18,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '추추/00/남/용인',
    },
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '참석 가능한 시간을 댓글로 알려 주세요. 함께 저녁 먹을 날짜를 정해 봐요.',
    contentItems: [
      {
        text: '참석 가능한 시간을 댓글로 알려 주세요. 함께 저녁 먹을 날짜를 정해 봐요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-28T12:00:00+09:00',
    id: 3,
    isPublic: false,
    likeCount: 0,
    location: '추추/00/남/용인',
    title: '@안양/00/남/안양 @추추/00/남/용인 @연두/02/여/구운',
    viewCount: 25,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[2],
    commentCount: 1,
    content:
      '참석 신청 후 일정이 바뀌면 미리 알려 주세요. 서로 배려하며 즐거운 모임을 만들어요.',
    contentItems: [
      {
        text: '참석 신청 후 일정이 바뀌면 미리 알려 주세요. 서로 배려하며 즐거운 모임을 만들어요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-27T12:00:00+09:00',
    id: 4,
    isPublic: false,
    likeCount: 2,
    location: GROUP_POST_AUTHOR.nickname,
    title: '모임에만 공개된 게시물이에요.',
    viewCount: 30,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '안양/00/남/안양',
    },
    category: GROUP_BOARD_MENU_ITEMS[3],
    commentCount: 2,
    content:
      '광교호수공원을 한 바퀴 걸으며 이야기 나눴어요. 중간에 쉬어 가며 처음 오신 분들과도 편하게 걸었습니다.',
    contentItems: [
      {
        text: '광교호수공원을 한 바퀴 걸으며 이야기 나눴어요. 중간에 쉬어 가며 처음 오신 분들과도 편하게 걸었습니다.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-review-walk/640/640',
        type: 'picture',
      },
      { schedule: GROUP_SCHEDULES[1], type: 'schedule' },
    ],
    createdAt: '2026-08-26T12:00:00+09:00',
    id: 5,
    imageUrl: 'https://picsum.photos/seed/group-post-review-walk/216/216',
    isPublic: true,
    likeCount: 7,
    location: '안양/00/남/안양',
    title: '광교호수공원 산책 후기 남겨요',
    viewCount: 54,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '포포/57/남/인계',
    },
    category: GROUP_BOARD_MENU_ITEMS[4],
    commentCount: 1,
    content:
      '안녕하세요, 인계동에 사는 포포입니다. 산책과 맛집 탐방을 좋아해요. 다음 모임에서 인사드리겠습니다!',
    contentItems: [
      {
        text: '안녕하세요, 인계동에 사는 포포입니다. 산책과 맛집 탐방을 좋아해요. 다음 모임에서 인사드리겠습니다!',
        type: 'text',
      },
    ],
    createdAt: '2026-08-25T12:00:00+09:00',
    id: 6,
    isPublic: true,
    likeCount: 5,
    location: '포포/57/남/인계',
    title: '가입했습니다 잘 부탁드려요',
    viewCount: 44,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '이번 주말 오후에 커피 한 잔 하실 분 계신가요? 인계동 근처 조용한 카페를 생각하고 있어요.',
    contentItems: [
      {
        text: '이번 주말 오후에 커피 한 잔 하실 분 계신가요? 인계동 근처 조용한 카페를 생각하고 있어요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-coffee/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-24T12:00:00+09:00',
    id: 7,
    imageUrl: 'https://picsum.photos/seed/group-post-coffee/216/216',
    isPublic: true,
    likeCount: 4,
    location: GROUP_POST_AUTHOR.nickname,
    title: '이번 주말 커피 모임 어떠세요',
    viewCount: 38,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '연두/02/여/구운',
    },
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '인계동에서 네 명 정도 함께 갈 만한 맛집을 찾고 있어요. 한식이나 일식으로 추천 부탁드립니다.',
    contentItems: [
      {
        text: '인계동에서 네 명 정도 함께 갈 만한 맛집을 찾고 있어요. 한식이나 일식으로 추천 부탁드립니다.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-23T12:00:00+09:00',
    id: 8,
    isPublic: true,
    likeCount: 6,
    location: '연두/02/여/구운',
    title: '인계동 맛집 추천 받아요',
    viewCount: 61,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '밤비/94/남/화서',
    },
    category: GROUP_BOARD_MENU_ITEMS[2],
    commentCount: 1,
    content:
      '이번 달 정기 모임은 8월 29일 오후 6시에 진행합니다. 참석하실 분은 댓글을 남겨 주세요.',
    contentItems: [
      {
        text: '이번 달 정기 모임은 8월 29일 오후 6시에 진행합니다. 참석하실 분은 댓글을 남겨 주세요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-22T12:00:00+09:00',
    id: 9,
    isPublic: true,
    likeCount: 3,
    location: '밤비/94/남/화서',
    title: '이번 달 정기 모임 안내',
    viewCount: 72,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[3],
    commentCount: 1,
    content:
      '함께 먹었던 저녁 모임 사진 올려요. 음식도 맛있고 이야기도 즐거웠습니다. 다음에도 함께해요!',
    contentItems: [
      {
        text: '함께 먹었던 저녁 모임 사진 올려요. 음식도 맛있고 이야기도 즐거웠습니다. 다음에도 함께해요!',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-dinner/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-21T12:00:00+09:00',
    id: 10,
    imageUrl: 'https://picsum.photos/seed/group-post-dinner/216/216',
    isPublic: true,
    likeCount: 10,
    location: GROUP_POST_AUTHOR.nickname,
    title: '저녁 모임 사진 공유합니다',
    viewCount: 96,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '구운/02/여/수원',
    },
    category: GROUP_BOARD_MENU_ITEMS[4],
    commentCount: 1,
    content:
      '안녕하세요! 구운동에 살고 있어요. 주말에 산책하고 카페 가는 걸 좋아합니다. 잘 부탁드려요.',
    contentItems: [
      {
        text: '안녕하세요! 구운동에 살고 있어요. 주말에 산책하고 카페 가는 걸 좋아합니다. 잘 부탁드려요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-20T12:00:00+09:00',
    id: 11,
    isPublic: true,
    likeCount: 2,
    location: '구운/02/여/수원',
    title: '처음 인사드려요',
    viewCount: 29,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '민트/98/여/매탄',
    },
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '케이크와 구움과자 좋아하시는 분 계신가요? 영통 쪽 디저트 카페에 같이 가고 싶어요.',
    contentItems: [
      {
        text: '케이크와 구움과자 좋아하시는 분 계신가요? 영통 쪽 디저트 카페에 같이 가고 싶어요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-dessert/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-19T12:00:00+09:00',
    id: 12,
    imageUrl: 'https://picsum.photos/seed/group-post-dessert/216/216',
    isPublic: true,
    likeCount: 8,
    location: '민트/98/여/매탄',
    title: '디저트 좋아하시는 분 계신가요',
    viewCount: 83,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[2],
    commentCount: 0,
    content:
      '다음 달 모임 운영에 관한 의견을 받고 있습니다. 건의하고 싶은 내용은 운영진에게 전달해 주세요.',
    contentItems: [
      {
        text: '다음 달 모임 운영에 관한 의견을 받고 있습니다. 건의하고 싶은 내용은 운영진에게 전달해 주세요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-18T12:00:00+09:00',
    id: 13,
    isPublic: false,
    likeCount: 0,
    location: GROUP_POST_AUTHOR.nickname,
    title: '모임에만 공개된 게시물이에요.',
    viewCount: 14,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '하늘/95/남/권선',
    },
    category: GROUP_BOARD_MENU_ITEMS[3],
    commentCount: 1,
    content:
      '공원에서 천천히 걸으니 기분이 좋았습니다. 처음 참여했는데 편하게 맞아 주셔서 감사해요.',
    contentItems: [
      {
        text: '공원에서 천천히 걸으니 기분이 좋았습니다. 처음 참여했는데 편하게 맞아 주셔서 감사해요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-park/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-17T12:00:00+09:00',
    id: 14,
    imageUrl: 'https://picsum.photos/seed/group-post-park/216/216',
    isPublic: true,
    likeCount: 5,
    location: '하늘/95/남/권선',
    title: '공원 걷기 일정 좋았습니다',
    viewCount: 47,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '도도/97/여/망포',
    },
    category: GROUP_BOARD_MENU_ITEMS[4],
    commentCount: 1,
    content:
      '망포에 사는 도도입니다. 퇴근 후 산책하거나 주말에 맛집 가는 걸 좋아해요. 반갑습니다!',
    contentItems: [
      {
        text: '망포에 사는 도도입니다. 퇴근 후 산책하거나 주말에 맛집 가는 걸 좋아해요. 반갑습니다!',
        type: 'text',
      },
    ],
    createdAt: '2026-08-16T12:00:00+09:00',
    id: 15,
    isPublic: true,
    likeCount: 4,
    location: '도도/97/여/망포',
    title: '새로 가입했어요 반갑습니다',
    viewCount: 35,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '함께 먹기 좋은 점심 메뉴를 모아 봤어요.\n칼국수, 비빔밥, 돈가스 중 어떤 메뉴가 좋으세요?',
    contentItems: [
      {
        text: '함께 먹기 좋은 점심 메뉴를 모아 봤어요.\n칼국수, 비빔밥, 돈가스 중 어떤 메뉴가 좋으세요?',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-noodle/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-15T12:00:00+09:00',
    id: 16,
    imageUrl: 'https://picsum.photos/seed/group-post-noodle/216/216',
    isPublic: true,
    likeCount: 12,
    location: GROUP_POST_AUTHOR.nickname,
    title: '점심 메뉴 추천 리스트',
    viewCount: 118,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '라라/96/여/영통',
    },
    category: GROUP_BOARD_MENU_ITEMS[2],
    commentCount: 1,
    content:
      '서로 존중하는 말투를 사용해 주세요. 모임 사진을 외부에 공유하기 전에는 사진에 나온 분들의 동의를 받아 주세요.',
    contentItems: [
      {
        text: '서로 존중하는 말투를 사용해 주세요. 모임 사진을 외부에 공유하기 전에는 사진에 나온 분들의 동의를 받아 주세요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-14T12:00:00+09:00',
    id: 17,
    isPublic: true,
    likeCount: 1,
    location: '라라/96/여/영통',
    title: '모임 운영 안내사항 공유',
    viewCount: 51,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '봄봄/99/여/인계',
    },
    category: GROUP_BOARD_MENU_ITEMS[3],
    commentCount: 1,
    content:
      '저녁에 야경을 보면서 산책하고 왔어요. 바람이 시원해서 걷기 좋았습니다. 풍경 사진도 공유해요.',
    contentItems: [
      {
        text: '저녁에 야경을 보면서 산책하고 왔어요. 바람이 시원해서 걷기 좋았습니다. 풍경 사진도 공유해요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-night-view/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-13T12:00:00+09:00',
    id: 18,
    imageUrl: 'https://picsum.photos/seed/group-post-night-view/216/216',
    isPublic: true,
    likeCount: 9,
    location: '봄봄/99/여/인계',
    title: '야경 보고 온 후기',
    viewCount: 89,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[4],
    commentCount: 1,
    content:
      '안녕하세요, 새로 가입했습니다. 동네에서 함께 취미를 즐길 이웃을 만나고 싶어요. 잘 부탁드립니다.',
    contentItems: [
      {
        text: '안녕하세요, 새로 가입했습니다. 동네에서 함께 취미를 즐길 이웃을 만나고 싶어요. 잘 부탁드립니다.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-12T12:00:00+09:00',
    id: 19,
    isPublic: false,
    likeCount: 1,
    location: GROUP_POST_AUTHOR.nickname,
    title: '모임에만 공개된 게시물이에요.',
    viewCount: 22,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '초코/93/남/팔달',
    },
    category: GROUP_BOARD_MENU_ITEMS[1],
    commentCount: 1,
    content:
      '고기 모임 정말 즐거웠습니다. 다음에는 더 많은 분들과 함께 가요. 선호하는 요일을 알려 주세요.',
    contentItems: [
      {
        text: '고기 모임 정말 즐거웠습니다. 다음에는 더 많은 분들과 함께 가요. 선호하는 요일을 알려 주세요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-bbq/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-11T12:00:00+09:00',
    id: 20,
    imageUrl: 'https://picsum.photos/seed/group-post-bbq/216/216',
    isPublic: true,
    likeCount: 6,
    location: '초코/93/남/팔달',
    title: '고기 모임 다음에도 같이 가요',
    viewCount: 74,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '루루/01/여/권선',
    },
    category: GROUP_BOARD_MENU_ITEMS[2],
    commentCount: 1,
    content:
      '새로 오신 분들 환영합니다! 가입인사 게시판에 소개를 남겨 주세요. 일정별 장소와 준비물은 신청 전에 확인해 주세요.',
    contentItems: [
      {
        text: '새로 오신 분들 환영합니다! 가입인사 게시판에 소개를 남겨 주세요. 일정별 장소와 준비물은 신청 전에 확인해 주세요.',
        type: 'text',
      },
    ],
    createdAt: '2026-08-10T12:00:00+09:00',
    id: 21,
    isPublic: true,
    likeCount: 2,
    location: '루루/01/여/권선',
    title: '신규 멤버 필독 공지',
    viewCount: 64,
  },
  {
    authorProfile: GROUP_POST_AUTHOR,
    category: GROUP_BOARD_MENU_ITEMS[3],
    commentCount: 1,
    content:
      '한강에서 산책하고 돗자리를 펴고 쉬다 왔어요. 물과 간식을 나누며 즐겁게 보냈습니다. 다음에는 노을도 보고 와요.',
    contentItems: [
      {
        text: '한강에서 산책하고 돗자리를 펴고 쉬다 왔어요. 물과 간식을 나누며 즐겁게 보냈습니다. 다음에는 노을도 보고 와요.',
        type: 'text',
      },
      {
        imageUrl: 'https://picsum.photos/seed/group-post-river/640/640',
        type: 'picture',
      },
    ],
    createdAt: '2026-08-09T12:00:00+09:00',
    id: 22,
    imageUrl: 'https://picsum.photos/seed/group-post-river/216/216',
    isPublic: true,
    likeCount: 5,
    location: GROUP_POST_AUTHOR.nickname,
    title: '한강 다녀온 일정 후기',
    viewCount: 57,
  },
  {
    authorProfile: {
      ...GROUP_POST_AUTHOR,
      nickname: '단비/00/여/화서',
    },
    category: GROUP_BOARD_MENU_ITEMS[4],
    commentCount: 1,
    content:
      '화서동에 사는 단비입니다. 주말 나들이와 사진 찍는 것을 좋아해요. 가까운 일정부터 참여해 보겠습니다!',
    contentItems: [
      {
        text: '화서동에 사는 단비입니다. 주말 나들이와 사진 찍는 것을 좋아해요. 가까운 일정부터 참여해 보겠습니다!',
        type: 'text',
      },
    ],
    createdAt: '2026-08-08T12:00:00+09:00',
    id: 23,
    isPublic: true,
    likeCount: 7,
    location: '단비/00/여/화서',
    title: '가입 인사 남깁니다',
    viewCount: 92,
  },
];

export const GROUP_POST_COMMENTS: readonly GroupPostComment[] = [
  {
    postId: 1,
    comments: [
      {
        content: '사진만 봐도 맛있어 보여요. 다음에 같이 가고 싶네요.',
        createdAt: '2026-08-31T13:00:00+09:00',
        id: 1,
        likeCount: 2,
        location: '경기 수원시 권선구',
        nickname: '연두/02/여/구운',
        profileImageUrl: 'https://picsum.photos/seed/group-comment-1/72/72',
        replyCount: 1,
        replies: [
          {
            content: '다음 일정 잡히면 같이 가요.',
            createdAt: '2026-08-31T13:30:00+09:00',
            id: 11,
            likeCount: 1,
            location: '경기 수원시 팔달구',
            nickname: '유화/00/여/권선',
            replyCount: 0,
          },
        ],
      },
      {
        content: '여기 어디인지 공유 가능할까요?',
        createdAt: '2026-08-31T14:00:00+09:00',
        id: 2,
        likeCount: 0,
        location: '경기 수원시 팔달구',
        nickname: '밤비/94/남/화서',
        profileImageUrl: 'https://picsum.photos/seed/group-comment-2/72/72',
        replyCount: 0,
      },
    ],
  },
  {
    postId: 2,
    comments: [
      {
        content: '콩불이면 인정입니다. 양도 좋아 보여요.',
        createdAt: '2026-08-30T15:00:00+09:00',
        id: 3,
        likeCount: 1,
        location: '경기 안양시 만안구',
        nickname: '안양/00/남/안양',
        profileImageUrl: 'https://picsum.photos/seed/group-comment-3/72/72',
        replyCount: 0,
      },
    ],
  },
  {
    postId: 5,
    comments: [
      {
        content: '걷기 코스 좋았어요. 다음에도 참여하겠습니다.',
        createdAt: '2026-08-26T18:00:00+09:00',
        id: 4,
        likeCount: 3,
        location: '경기 수원시 팔달구',
        nickname: '포포/57/남/인계',
        profileImageUrl: 'https://picsum.photos/seed/group-comment-4/72/72',
        replyCount: 0,
      },
      {
        content: '사진 분위기가 좋네요.',
        createdAt: '2026-08-26T19:00:00+09:00',
        id: 5,
        likeCount: 1,
        location: '경기 수원시 권선구',
        nickname: '하늘/95/남/권선',
        replyCount: 0,
      },
    ],
  },
  {
    postId: 6,
    comments: [
      {
        content: '반갑습니다. 모임에서 자주 뵈어요.',
        createdAt: '2026-08-25T13:00:00+09:00',
        id: 6,
        likeCount: 2,
        location: '경기 수원시 팔달구',
        nickname: '유화/00/여/권선',
        profileImageUrl: 'https://picsum.photos/seed/group-comment-6/72/72',
        replyCount: 0,
      },
    ],
  },
  {
    postId: 3,
    comments: [
      {
        content: '저는 토요일 저녁에 참석할 수 있어요.',
        createdAt: '2026-08-29T13:00:00+09:00',
        id: 300,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 4,
    comments: [
      {
        content: '확인했습니다. 변경되면 미리 말씀드릴게요.',
        createdAt: '2026-08-28T13:00:00+09:00',
        id: 400,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 7,
    comments: [
      {
        content: '토요일 오후 2시 좋아요.',
        createdAt: '2026-08-25T13:00:00+09:00',
        id: 700,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 8,
    comments: [
      {
        content: '한식 좋네요. 저도 같이 찾아볼게요.',
        createdAt: '2026-08-24T13:00:00+09:00',
        id: 800,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 9,
    comments: [
      {
        content: '참석하겠습니다. 장소 정해지면 알려 주세요.',
        createdAt: '2026-08-23T13:00:00+09:00',
        id: 900,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 10,
    comments: [
      {
        content: '함께해서 즐거웠어요. 사진 감사합니다!',
        createdAt: '2026-08-22T13:00:00+09:00',
        id: 1000,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 11,
    comments: [
      {
        content: '환영합니다! 다음 산책에서 뵈어요.',
        createdAt: '2026-08-21T13:00:00+09:00',
        id: 1100,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 12,
    comments: [
      {
        content: '저는 휘낭시에 좋아해요.',
        createdAt: '2026-08-20T13:00:00+09:00',
        id: 1200,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  { postId: 13, comments: [] },
  {
    postId: 14,
    comments: [
      {
        content: '다음에도 편하게 참여해 주세요.',
        createdAt: '2026-08-18T13:00:00+09:00',
        id: 1400,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 15,
    comments: [
      {
        content: '환영합니다! 저도 퇴근 후 산책 좋아해요.',
        createdAt: '2026-08-17T13:00:00+09:00',
        id: 1500,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 16,
    comments: [
      {
        content: '저는 칼국수에 한 표요.',
        createdAt: '2026-08-16T13:00:00+09:00',
        id: 1600,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 17,
    comments: [
      {
        content: '안내 확인했습니다. 사진 공유 전에 꼭 물어볼게요.',
        createdAt: '2026-08-15T13:00:00+09:00',
        id: 1700,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 18,
    comments: [
      {
        content: '야경이 멋지네요. 다음에는 저도 가고 싶어요.',
        createdAt: '2026-08-14T13:00:00+09:00',
        id: 1800,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 19,
    comments: [
      {
        content: '반갑습니다. 모임에서 뵐게요!',
        createdAt: '2026-08-13T13:00:00+09:00',
        id: 1900,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 20,
    comments: [
      {
        content: '저는 금요일 저녁이 편해요.',
        createdAt: '2026-08-12T13:00:00+09:00',
        id: 2000,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 21,
    comments: [
      {
        content: '안내 감사합니다. 가입인사 남겼어요.',
        createdAt: '2026-08-11T13:00:00+09:00',
        id: 2100,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 22,
    comments: [
      {
        content: '노을 보는 일정도 좋겠어요.',
        createdAt: '2026-08-10T13:00:00+09:00',
        id: 2200,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
  },
  {
    postId: 23,
    comments: [
      {
        content: '환영해요! 다음 나들이에서 만나요.',
        createdAt: '2026-08-09T13:00:00+09:00',
        id: 2300,
        likeCount: 0,
        location: GROUP_MEMBERS[0].location,
        nickname: GROUP_MEMBERS[0].name,
        profileImageUrl: GROUP_MEMBERS[0].profileImageUrl,
        replyCount: 0,
      },
    ],
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
