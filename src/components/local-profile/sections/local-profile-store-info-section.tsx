import type { ReactNode } from 'react';
import {
  CallIcon,
  ChevronDownIcon,
  ClockIcon,
  CopyIcon,
  LocationIcon,
  StoreInfoIcon,
  WebIcon,
} from '@/assets/icons';
import CommonToast from '@/components/ui/common-toast.tsx';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button.tsx';
import LocalProfileMeta from '@/components/local-profile/local-profile-meta.tsx';
import useCollapse from '@/hooks/use-collapse.ts';
import useToast from '@/hooks/use-toast.ts';
import { copyTextToClipboard, getFullAddress } from '@/lib/utils.ts';
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
    isExpanded: isAddressExpanded,
    toggleCollapse: toggleAddressCollapse,
  } = useCollapse(true);
  const {
    isExpanded: isBusinessHoursExpanded,
    toggleCollapse: toggleBusinessHoursCollapse,
  } = useCollapse(true);
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

        <LocalProfileMeta {...item} variant="store-info" />
      </div>

      <hr className="local-profile-store-info-divider" />

      <div className="local-profile-store-info-list">
        <div className="local-profile-store-info-row local-profile-store-info-row--hours">
          <ClockIcon />
          <div className="local-profile-store-info-content">
            <button
              className="local-profile-store-info-main"
              type="button"
              aria-expanded={isBusinessHoursExpanded}
              onClick={toggleBusinessHoursCollapse}
            >
              <span>{storeInfo.businessHours.current}</span>
              <ChevronDownIcon />
            </button>
            <div
              className={`common-collapse${
                isBusinessHoursExpanded
                  ? ' common-collapse--expanded'
                  : ''
              }`}
              aria-hidden={!isBusinessHoursExpanded}
            >
              <div className="common-collapse-content">
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
            <button
              className="local-profile-store-info-main"
              type="button"
              aria-expanded={isAddressExpanded}
              onClick={toggleAddressCollapse}
            >
              <span>{storeInfo.addressSummary}</span>
              <ChevronDownIcon />
            </button>

            <div
              className={`common-collapse${
                isAddressExpanded
                  ? ' common-collapse--expanded'
                  : ''
              }`}
              aria-hidden={!isAddressExpanded}
            >
              <div className="common-collapse-content local-profile-store-info-addresses">
                {storeInfo.addresses.map((address) => (
                  <div
                    className="local-profile-store-info-address"
                    key={address.label}
                  >
                    <span>{address.label}</span>
                    <p>
                      {getFullAddress(address.address, address.addressDetail)}
                      <button
                        type="button"
                        onClick={() => {
                          void handleCopyText(
                            getFullAddress(
                              address.address,
                              address.addressDetail,
                            ),
                          );
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
        </div>

        <img
          className="local-profile-store-info-map"
          src={storeInfo.mapImageUrl}
          alt={`${item.name} 지도`}
        />

        <OpenAppCtaButton />
      </div>

      {isCopyMessageVisible && (
        <CommonToast message="복사되었어요" onClose={hideCopyMessage} />
      )}
    </div>
  );
}
