import type { ReactNode } from 'react';
import { CurrentLocationIcon, SearchIcon } from '@/assets/icons';
import { BUY_SELL_RECOMMENDED_LOCATIONS } from '@/types/buy-sell-constants.ts';
import CommonPopup from '@/components/ui/common-popup';

type RegionSettingPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RegionSettingPopup({
  isOpen,
  onClose,
}: RegionSettingPopupProps): ReactNode {
  return (
    <CommonPopup isOpen={isOpen} title="지역 변경" onClose={onClose}>
      <form className="region-setting-popup-search-form">
        <input
          aria-label="지역 검색"
          className="region-setting-popup-search-input"
          placeholder="지역이나 동네로 검색하기"
          type="search"
        />
        <button
          aria-label="지역 검색"
          className="region-setting-popup-search-button"
          type="submit"
        >
          <SearchIcon />
        </button>
      </form>

      <button className="region-setting-popup-current-button" type="button">
        <CurrentLocationIcon className="region-setting-popup-current-icon" />
        현재 내 위치 사용하기
      </button>

      <section className="region-setting-popup-recommend">
        <h3 className="region-setting-popup-recommend-title">추천</h3>
        <ul className="region-setting-popup-recommend-list">
          {BUY_SELL_RECOMMENDED_LOCATIONS.map((location) => (
            <li className="region-setting-popup-recommend-item" key={location}>
              <button type="button">{location}</button>
            </li>
          ))}
        </ul>
      </section>
    </CommonPopup>
  );
}
