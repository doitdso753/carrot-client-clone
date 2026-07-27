import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { LogoIcon } from '@/assets/icons';
import CategoryIcon from '@/components/ui/category-icon.tsx';
import KeywordLinkList from '@/components/ui/keyword-link-list.tsx';
import SearchForm from '@/components/ui/search-form.tsx';
import useElementHeightCssVariable from '@/hooks/use-element-height-css-variable.ts';
import { CATEGORIES, RECOMMEND_KEYWORDS } from '@/types/constants.ts';
import type { CategoryCode } from '@/types/types.ts';
import HeaderCategoryNav from '@/layouts/header-with-search/nav/header-category-nav.tsx';

const SEARCH_OPTIONS = CATEGORIES.map((category) => ({
  label: category.label,
  routing: category.routing,
  icon: <CategoryIcon iconName={category.iconName} />,
}));

type HeaderWithSearchProps = {
  activeCategoryCode?: CategoryCode;
};

// 검색 폼과 카테고리 메뉴를 포함한 상단 헤더 컴포넌트
export function HeaderWithSearch({
  activeCategoryCode = 'buySell',
}: HeaderWithSearchProps): ReactNode {
  const headerRef = useElementHeightCssVariable<HTMLElement>(
    '--header-with-search-height',
  );
  const activeCategory = CATEGORIES.find(
    (category) => category.code === activeCategoryCode,
  );

  return (
    <header
      className="header-wrapper header-with-search-wrapper"
      ref={headerRef}
    >
      <div className="header-with-search-inner mx-auto flex flex-col">
        <div className="header-with-search-row flex items-center gap-4">
          <Link
            className="flex shrink-0 items-center gap-3"
            to="/"
            aria-label="당근 홈"
          >
            <LogoIcon />
          </Link>

          <div className="header-search-form hidden min-w-0 flex-1 md:block">
            <SearchForm
              initialOptionLabel={activeCategory?.label}
              options={SEARCH_OPTIONS}
              submitIconType="search"
            />
          </div>

          <HeaderCategoryNav />
        </div>

        <div className="header-search-form md:hidden mt-5">
          <SearchForm
            initialOptionLabel={activeCategory?.label}
            options={SEARCH_OPTIONS}
            submitIconType="search"
          />
        </div>

        <KeywordLinkList
          title="추천 검색어"
          keywords={RECOMMEND_KEYWORDS}
          getKeywordPath={() => '/buy-sell'}
          variant="header"
        />
      </div>
    </header>
  );
}

export default HeaderWithSearch;
