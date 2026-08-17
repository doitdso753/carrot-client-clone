import type { ReactNode } from 'react';
import {
  CommentTextIcon,
  HotIcon,
  ThumbUpFillIcon,
  ThumbUpIcon,
} from '@/assets/icons';

type PopularCommunityStory = {
  title: string;
  metadata: string;
  likeCount: number;
  commentCount: number;
  imageUrl: string;
};

const POPULAR_COMMUNITY_STORIES: readonly PopularCommunityStory[] = [
  {
    title: '동물',
    metadata: '미추홀구 용현1,4동 · 취미 · 7일 전',
    likeCount: 1,
    commentCount: 17,
    imageUrl: 'https://picsum.photos/seed/neighborhood-animal/240/240',
  },
  {
    title: '**강아지 봉구 찾습니다**',
    metadata: '고양시 일산동구 고봉동 · 분실/실종 · 5일 전',
    likeCount: 48,
    commentCount: 58,
    imageUrl: 'https://picsum.photos/seed/neighborhood-dog/240/240',
  },
  {
    title: '광안리에 한달 살기 왔어요~',
    metadata: '수영구 광안제1동 · 동네풍경 · 6일 전',
    likeCount: 3,
    commentCount: 29,
    imageUrl: 'https://picsum.photos/seed/neighborhood-beach/240/240',
  },
  {
    title: '이게 뭐에쓰는 녀석일까요?',
    metadata: '청주시 흥덕구 봉명1동 · 일반 · 7일 전',
    likeCount: 0,
    commentCount: 12,
    imageUrl: 'https://picsum.photos/seed/neighborhood-question/240/240',
  },
  {
    title: '안녕하세요 포항에 온지 얼마 안된 학생입니다',
    metadata: '포항시 남구 지곡동 · 맛집 · 7일 전',
    likeCount: 3,
    commentCount: 31,
    imageUrl: 'https://picsum.photos/seed/neighborhood-student/240/240',
  },
  {
    title: '하늘이.. 반으로',
    metadata: '안산시 상록구 이동 · 동네풍경 · 7일 전',
    likeCount: 13,
    commentCount: 20,
    imageUrl: 'https://picsum.photos/seed/neighborhood-sky/240/240',
  },
  {
    title: '이게 뭘까요? ㅠㅠㅠㅠ',
    metadata: '미추홀구 도화동 · 고민/사연 · 8일 전',
    likeCount: 2,
    commentCount: 13,
    imageUrl: 'https://picsum.photos/seed/neighborhood-mystery/240/240',
  },
  {
    title: '이 친구 아시는 분 계신가요..',
    metadata: '용인시 처인구 역북동 · 반려동물 · 8일 전',
    likeCount: 1,
    commentCount: 13,
    imageUrl: 'https://picsum.photos/seed/neighborhood-friend/240/240',
  },
  {
    title: '길 가다가 애견미용실 있길래 봤....',
    metadata: '영등포구 당산제1동 · 동네풍경 · 8일 전',
    likeCount: 5,
    commentCount: 12,
    imageUrl: 'https://picsum.photos/seed/neighborhood-shop/240/240',
  },
  {
    title: '무슨 벌레인가요?...',
    metadata: '중구 남산1동 · 생활/편의 · 5일 전',
    likeCount: 0,
    commentCount: 21,
    imageUrl: 'https://picsum.photos/seed/neighborhood-bug/240/240',
  },
];

type StoryCountProps = {
  icon: ReactNode;
  count: number;
  label: string;
};

function StoryCount({ icon, count, label }: StoryCountProps): ReactNode {
  return (
    <span className="flex items-center gap-1 text-[1.4rem] font-normal text-[#868b94] [&>svg]:size-[1.8rem] [&>svg]:text-[#d1d3d8]">
      {icon}
      <span className="sr-only">{label}</span>
      {count}
    </span>
  );
}

export default function PopularCommunity(): ReactNode {
  return (
    <section className="mt-[8.4rem] flex w-full flex-col gap-[3.2rem] pb-[12rem]">
      <h2 className="flex items-center gap-[0.8rem] text-[2.4rem] font-bold text-(--color-palette-gray-1000) [&>svg]:size-[2.4rem] [&>svg]:text-[#ff3f3f]">
        <HotIcon />
        지금 뜨는 동네 이야기
      </h2>

      <ol className="grid list-none grid-cols-1 gap-x-[4.8rem] gap-y-[2.4rem] p-0 lg:grid-cols-2">
        {POPULAR_COMMUNITY_STORIES.map((story, index) => (
          <li className="min-w-0" key={story.title}>
            <a className="flex min-w-0 gap-[0.8rem]" href="/">
              <span className="w-[2.4rem] shrink-0 text-center text-[2rem] font-medium text-(--color-palette-gray-1000)">
                {index + 1}
              </span>

              <div className="flex min-w-0 flex-1 justify-between gap-[0.8rem]">
                <div className="flex min-w-0 flex-1 flex-col gap-[0.8rem]">
                  <div className="flex min-w-0 flex-col gap-[0.4rem]">
                    <h3 className="truncate text-[1.6rem] font-bold text-(--color-palette-gray-1000)">
                      {story.title}
                    </h3>
                    <p className="line-clamp-2 text-[1.4rem] font-normal text-[#868b94]">
                      {story.metadata}
                    </p>
                  </div>

                  <div className="flex items-center gap-[0.8rem]">
                    <StoryCount
                      icon={<ThumbUpFillIcon />}
                      count={story.likeCount}
                      label="좋아요"
                    />
                    <StoryCount
                      icon={<CommentTextIcon />}
                      count={story.commentCount}
                      label="댓글"
                    />
                  </div>
                </div>

                <div className="size-[9.6rem] shrink-0 sm:size-[10.8rem]">
                  <img
                    className="aspect-square h-full w-full shrink-0 rounded-[0.6rem] object-cover"
                    src={story.imageUrl}
                    alt=""
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
