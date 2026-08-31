import { useEffect, useRef, useState, type ReactNode } from 'react';
import { LocationIcon, PostIcon } from '@/assets/icons';
import KakaoMap from '@/components/ui/map/kakao-map.tsx';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button.tsx';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import { GROUP_COMMON_MENU_ITEMS, type GroupItem } from '@/types/group';

type GroupDetailSidebarProps = {
  item: GroupItem;
};

const DESCRIPTION_COLLAPSED_HEIGHT = 120;

export default function GroupDetailSidebar({
  item,
}: GroupDetailSidebarProps): ReactNode {
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [hasDescriptionOverflow, setHasDescriptionOverflow] = useState(false);

  // 설명 접힘 상태 초기화
  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [item.description]);

  // 설명 높이 초과 여부 감지
  useEffect(() => {
    const descriptionElement = descriptionRef.current;

    if (!descriptionElement) {
      return;
    }

    const updateDescriptionOverflow = (): void => {
      setHasDescriptionOverflow(
        descriptionElement.scrollHeight > DESCRIPTION_COLLAPSED_HEIGHT,
      );
    };

    updateDescriptionOverflow();

    const resizeObserver = new ResizeObserver(updateDescriptionOverflow);
    resizeObserver.observe(descriptionElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [item.description]);

  // 더보기 버튼 노출 조건
  const shouldShowMoreButton = hasDescriptionOverflow && !isDescriptionExpanded;

  return (
    <aside className="group-detail-sidebar" aria-label="모임 상세 메뉴">
      <section className="group-detail-profile">
        <img src={item.imageUrl} alt="" />
        <div className="group-detail-profile-text">
          <h1>{item.title}</h1>
          <p>
            멤버 {formatThousandsBySuffix(item.memberCount, '')} · 게시글{' '}
            {formatThousandsBySuffix(item.postCount, '')}
          </p>
        </div>
      </section>

      <section className="group-detail-summary">
        <p
          className={
            isDescriptionExpanded
              ? undefined
              : 'group-detail-summary-description--collapsed'
          }
          ref={descriptionRef}
        >
          {item.description}
        </p>
        {shouldShowMoreButton && (
          <button
            className="group-detail-more-button"
            type="button"
            onClick={() => setIsDescriptionExpanded(true)}
          >
            더보기
          </button>
        )}
        <ul className="car-detail-option-list" aria-label="모임 태그">
          <li className="car-detail-option">
            <LocationIcon />
            <span>{item.location}</span>
          </li>
          <li className="car-detail-option">{item.category.categoryName}</li>
          <li className="car-detail-option">동네 모임</li>
        </ul>
        <OpenAppCtaButton />
      </section>

      <nav className="group-detail-common-menu" aria-label="모임 공통 메뉴">
        <ul>
          {GROUP_COMMON_MENU_ITEMS.map(({ icon: Icon, label }, index) => (
            <li key={label}>
              <button
                className={index === 0 ? 'is-selected' : undefined}
                type="button"
              >
                <span className="group-detail-common-menu-icon">
                  <Icon />
                </span>
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="group-detail-board-menu" aria-label="모임 게시판 메뉴">
        <h2>게시판</h2>
        <ul>
          {item.boardMenuItems.map((label) => (
            <li key={label}>
              <button type="button">
                <PostIcon />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="group-detail-place">
        <h2>자주 모이는 장소</h2>
        <KakaoMap address={item.location} level={4} />
      </section>
    </aside>
  );
}
