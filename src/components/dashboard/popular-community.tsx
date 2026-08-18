import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { HotIcon } from '@/assets/icons';
import CommunityBoardItem from '@/components/ui/board-list/community-board-item.tsx';
import { POPULAR_COMMUNITY_ITEMS } from '@/types/community-constants.ts';

export default function PopularCommunity(): ReactNode {
  return (
    <section className="mt-[8.4rem] flex w-full flex-col gap-[3.2rem] pb-[12rem]">
      <h2 className="flex items-center gap-[0.8rem] text-[2.4rem] font-bold text-(--color-palette-gray-1000) [&>svg]:size-[2.4rem] [&>svg]:text-[#ff3f3f]">
        <HotIcon />
        지금 뜨는 동네 이야기
      </h2>

      <ol className="grid list-none grid-cols-1 gap-x-[4.8rem] gap-y-[2.4rem] p-0 lg:grid-cols-2">
        {POPULAR_COMMUNITY_ITEMS.map((story, index) => (
          <li className="min-w-0" key={story.id}>
            <Link
              className="flex min-w-0 cursor-pointer gap-[0.8rem]"
              to={`/community/${story.id}`}
            >
              <span className="w-[2.4rem] shrink-0 text-center text-[2rem] font-medium text-(--color-palette-gray-1000)">
                {index + 1}
              </span>

              <CommunityBoardItem item={story} variant="popular" />
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
