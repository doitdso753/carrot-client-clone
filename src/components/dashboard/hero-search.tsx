import { useEffect, useState, type ReactNode } from 'react';
import { LocationIcon } from '@/assets/icons';
import SearchForm from '@/components/ui/form/search-form.tsx';
import KeywordLinkList from '@/components/ui/navigation/keyword-link-list.tsx';
import type { CategoryItem } from '@/types/types.ts';

const HERO_KEYWORD_CHANGE_INTERVAL = 3000;

type HeroSearchProps = {
  categories: readonly CategoryItem[];
  heroKeywords: readonly string[];
  popularKeywords: readonly string[];
};

function getRandomKeyword(
  keywords: readonly string[],
  currentKeyword: string,
): string {
  const nextKeywords = keywords.filter((keyword) => keyword !== currentKeyword);
  const selectableKeywords = nextKeywords.length > 0 ? nextKeywords : keywords;
  const randomIndex = Math.floor(Math.random() * selectableKeywords.length);

  return selectableKeywords[randomIndex] ?? currentKeyword;
}

export default function HeroSearch({
  categories,
  heroKeywords,
  popularKeywords,
}: HeroSearchProps): ReactNode {
  const [heroKeyword, setHeroKeyword] = useState(heroKeywords[0] ?? '');
  const [isReverseMotion, setIsReverseMotion] = useState(false);
  const searchOptions = categories.map((category) => ({
    label: category.label,
    routing: category.routing,
  }));
  const getKeywordPath = (keyword: string): string => {
    const searchParams = new URLSearchParams({ search: keyword });
    const defaultCategoryPath = categories[0]?.routing ?? '/buy-sell';

    return `${defaultCategoryPath}?${searchParams.toString()}`;
  };

  useEffect(() => {
    if (heroKeywords.length < 2) {
      return;
    }

    const timerId = window.setInterval(() => {
      setHeroKeyword((currentKeyword) =>
        getRandomKeyword(heroKeywords, currentKeyword),
      );
      setIsReverseMotion((currentValue) => !currentValue);
    }, HERO_KEYWORD_CHANGE_INTERVAL);

    return () => {
      window.clearInterval(timerId);
    };
  }, [heroKeywords]);

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="flex w-full items-center justify-start gap-3 text-left leading-tight tracking-normal text-(--color-palette-gray-1000) lg:justify-center lg:text-center">
        <LocationIcon className="hidden size-[3.2rem] shrink-0 lg:block" />
        <span className="text-4xl font-extrabold md:text-5xl lg:whitespace-nowrap">
          <span className="block lg:inline">당근에서</span>{' '}
          <span className="block lg:inline">
            <span
              className={`inline-block ${
                isReverseMotion
                  ? 'animate-[hero-keyword-diagonal-reverse-enter_520ms_cubic-bezier(0.22,1,0.36,1)_both]'
                  : 'animate-[hero-keyword-diagonal-enter_520ms_cubic-bezier(0.22,1,0.36,1)_both]'
              }`}
              key={heroKeyword}
            >
              {heroKeyword}
            </span>{' '}
            찾고 계신가요?
          </span>
        </span>
      </h1>
      <div className="hero-search-wrapper">
        <SearchForm options={searchOptions} />
        <KeywordLinkList
          title="인기 검색어"
          keywords={popularKeywords}
          getKeywordPath={getKeywordPath}
        />
      </div>
    </div>
  );
}
