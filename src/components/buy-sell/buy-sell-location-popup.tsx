import type { ReactNode } from 'react';
import { CurrentLocationIcon, SearchIcon } from '@/assets/icons';
import { BUY_SELL_RECOMMENDED_LOCATIONS } from '@/types/buy-sell-constants.ts';
import CommonPopup from '@/components/ui/common-popup';

type BuySellLocationPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BuySellLocationPopup({
  isOpen,
  onClose,
}: BuySellLocationPopupProps): ReactNode {
  return (
    <CommonPopup isOpen={isOpen} title="지역 변경" onClose={onClose}>
      <form className="location-popup-search-form">
        <input
          aria-label="지역 검색"
          className="location-popup-search-input"
          placeholder="지역이나 동네로 검색하기"
          type="search"
        />
        <button
          aria-label="지역 검색"
          className="location-popup-search-button"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>

      <button className="location-popup-current-button" type="button">
        <CurrentLocationIcon className="location-popup-current-icon" />
        현재 내 위치 사용하기
      </button>

      <section className="location-popup-recommend">
        <h3 className="location-popup-recommend-title">추천</h3>
        <ul className="location-popup-recommend-list">
          {BUY_SELL_RECOMMENDED_LOCATIONS.map((location) => (
            <li className="location-popup-recommend-item" key={location}>
              <button type="button">{location}</button>
            </li>
          ))}
        </ul>
      </section>
    </CommonPopup>
  );
}
