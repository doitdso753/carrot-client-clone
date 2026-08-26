import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { LogoIcon } from '@/assets/icons';
import CategoryIcon from '@/components/ui/category-icon.tsx';
import SearchForm from '@/components/ui/form/search-form.tsx';
import KeywordLinkList from '@/components/ui/navigation/keyword-link-list.tsx';
import useElementHeightCssVariable from '@/hooks/use-element-height-css-variable.ts';
import useMobileHeaderBehavior from '@/hooks/use-mobile-header-behavior.ts';
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
  const {
    handleMobileNavOpenChange,
    handleToggleSearch,
    isHeaderVisible,
    isMobileSearchOpen,
  } = useMobileHeaderBehavior();
  const headerRef = useElementHeightCssVariable<HTMLElement>(
    '--header-with-search-height',
  );
  const activeCategory =
    CATEGORIES.find((category) => category.code === activeCategoryCode) ??
    CATEGORIES[0];

  const getKeywordPath = (keyword: string): string => {
    const searchParams = new URLSearchParams({ search: keyword });

    return `${activeCategory.routing}?${searchParams.toString()}`;
  };

  return (
    <header
      className={`header-wrapper header-with-search-wrapper ${
        isHeaderVisible ? '' : 'is-hidden'
      }`}
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
              chevronIconType="outline"
            />
          </div>

          <HeaderCategoryNav
            onMobileNavOpenChange={handleMobileNavOpenChange}
            isSearchOpen={isMobileSearchOpen}
            onToggleSearch={handleToggleSearch}
          />
        </div>

        <div
          className={`header-mobile-search-panel ${
            isMobileSearchOpen ? 'is-open' : 'is-hidden'
          }`}
          id="header-mobile-search-panel"
        >
          <div className="header-search-form md:hidden">
            <SearchForm
              initialOptionLabel={activeCategory?.label}
              options={SEARCH_OPTIONS}
              submitIconType="search"
            />
          </div>

          <KeywordLinkList
            title="추천 검색어"
            keywords={RECOMMEND_KEYWORDS}
            getKeywordPath={getKeywordPath}
            variant="header"
          />
        </div>
      </div>
    </header>
  );
}

export default HeaderWithSearch;
