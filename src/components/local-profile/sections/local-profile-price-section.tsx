import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { ChevronDownIcon } from '@/assets/icons';
import useCollapse from '@/hooks/ui/use-collapse.ts';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';
import type { LocalProfilePrice } from '@/types/types.ts';

type LocalProfilePriceSectionProps = {
  prices?: LocalProfilePrice[];
};

const INITIAL_VISIBLE_PRICE_COUNT = 4;

export default function LocalProfilePriceSection({
  prices = [],
}: LocalProfilePriceSectionProps): ReactNode {
  const { isExpanded, toggleCollapse } = useCollapse(false);
  const hasMorePrices = prices.length > INITIAL_VISIBLE_PRICE_COUNT;
  const visiblePrices = useMemo(
    () =>
      isExpanded || !hasMorePrices
        ? prices
        : prices.slice(0, INITIAL_VISIBLE_PRICE_COUNT),
    [hasMorePrices, isExpanded, prices],
  );
  const renderPriceItem = (price: LocalProfilePrice): ReactNode => (
    <div className="local-profile-price-item" key={price.id}>
      <div className="local-profile-price-summary">
        <div className="local-profile-price-title-row">
          <strong>{price.title}</strong>
          {price.isRepresentative && (
            <span className="local-profile-price-badge">대표</span>
          )}
        </div>

        <span className="local-profile-price-dash" aria-hidden="true" />

        <strong className="local-profile-price-value">{price.price}</strong>
      </div>

      {price.description && (
        <p className="local-profile-price-description">{price.description}</p>
      )}
    </div>
  );

  return (
    <LocalProfileDetailSection title="가격">
      <div className="local-profile-price-list">
        {visiblePrices.map(renderPriceItem)}
      </div>

      {hasMorePrices && (
        <button
          className="local-profile-price-more"
          type="button"
          aria-expanded={isExpanded}
          onClick={toggleCollapse}
        >
          {isExpanded ? '접기' : '가격 더보기'}
          <ChevronDownIcon />
        </button>
      )}
    </LocalProfileDetailSection>
  );
}
