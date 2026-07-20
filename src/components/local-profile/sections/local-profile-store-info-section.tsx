import type { ReactNode } from 'react';
import {
  CallIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
  LocationIcon,
  StarIcon,
  StoreInfoIcon,
  WebIcon,
} from '@/assets/icons';
import CommonToast from '@/components/ui/common-toast.tsx';
import useToast from '@/hooks/use-toast.ts';
import { copyTextToClipboard } from '@/lib/utils.ts';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileStoreInfoSectionProps = {
  item: LocalProfileItem;
};

export default function LocalProfileStoreInfoSection({
  item,
}: LocalProfileStoreInfoSectionProps): ReactNode {
  const { storeInfo } = item;
  const {
    hideMessage: hideCopyMessage,
    isVisible: isCopyMessageVisible,
    showMessage: showCopyMessage,
  } = useToast();

  const handleCopyText = async (text: string): Promise<void> => {
    await copyTextToClipboard(text);
    showCopyMessage();
  };

  if (!storeInfo) {
    return <LocalProfileDetailSection title="가게정보" />;
  }

  return (
    <div className="local-profile-store-info">
      <div className="local-profile-store-info-summary">
        <h3>{item.name}</h3>

        <div className="local-profile-store-info-meta">
          <strong>
            <StarIcon />
            {item.rating.toFixed(1)}
          </strong>
          <a href="#reviews">후기 {item.reviewCount.toLocaleString()}</a>
          <span>단골 {item.commentCount.toLocaleString()}</span>
        </div>

        <p>
          {item.regionText} · {item.category}
        </p>
      </div>

      <hr className="local-profile-store-info-divider" />

      <div className="local-profile-store-info-list">
        <div className="local-profile-store-info-row local-profile-store-info-row--hours">
          <ClockIcon />
          <div className="local-profile-store-info-content">
            <div className="local-profile-store-info-main">
              <span>{storeInfo.businessHours.current}</span>
              <ChevronDownIcon />
            </div>
            <ul className="local-profile-store-info-hours">
              {storeInfo.businessHours.daily.map((hour) => (
                <li key={hour}>{hour}</li>
              ))}
            </ul>
            <p className="local-profile-store-info-caption">
              {storeInfo.businessHours.description}
            </p>
          </div>
        </div>

        <div className="local-profile-store-info-row">
          <StoreInfoIcon />
          <p>{storeInfo.facilities}</p>
        </div>

        <div className="local-profile-store-info-row">
          <CallIcon />
          <div className="local-profile-store-info-copy-row">
            <span>{storeInfo.contact}</span>
            <button
              type="button"
              onClick={() => {
                void handleCopyText(storeInfo.contact);
              }}
            >
              <CopyIcon />
              복사
            </button>
          </div>
        </div>

        <div className="local-profile-store-info-row">
          <WebIcon />
          <a
            className="local-profile-store-info-website"
            href={storeInfo.website}
            target="_blank"
            rel="noreferrer"
          >
            {storeInfo.website}
          </a>
        </div>

        <div className="local-profile-store-info-row local-profile-store-info-row--address">
          <LocationIcon />
          <div className="local-profile-store-info-content">
            <div className="local-profile-store-info-main">
              <span>{storeInfo.addressSummary}</span>
              <ChevronDownIcon />
            </div>

            <div className="local-profile-store-info-addresses">
              {storeInfo.addresses.map((address) => (
                <div
                  className="local-profile-store-info-address"
                  key={address.label}
                >
                  <span>{address.label}</span>
                  <p>
                    {address.value}
                    <button
                      type="button"
                      onClick={() => {
                        void handleCopyText(address.value);
                      }}
                    >
                      <CopyIcon />
                      복사
                    </button>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <img
          className="local-profile-store-info-map"
          src={storeInfo.mapImageUrl}
          alt={`${item.name} 지도`}
        />

        <a
          className="local-profile-store-info-app-link"
          href={storeInfo.appLink}
          target="_blank"
          rel="noreferrer"
        >
          당근 앱에서 보기
        </a>
      </div>

      {isCopyMessageVisible && (
        <CommonToast message="복사되었어요" onClose={hideCopyMessage} />
      )}
    </div>
  );
}
