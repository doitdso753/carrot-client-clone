import type { ReactNode } from 'react';
import { CopyIcon } from '@/assets/icons';
import KakaoMap from '@/components/ui/map/kakao-map.tsx';
import CommonToast from '@/components/ui/common-toast';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button';
import useToast from '@/hooks/ui/use-toast.ts';
import { copyTextToClipboard } from '@/lib/utils';

type CarMapProps = {
  address: string;
};

export default function CarMap({ address }: CarMapProps): ReactNode {
  const {
    hideMessage: hideCopyMessage,
    isVisible: isCopyMessageVisible,
    showMessage: showCopyMessage,
  } = useToast();

  const handleCopyAddress = async (): Promise<void> => {
    await copyTextToClipboard(address);
    showCopyMessage();
  };

  return (
    <section className="car-detail-map-section" aria-label="차량 위치">
      <KakaoMap address={address} />
      <div className="car-detail-map-address">
        <p>{address}</p>
        <button type="button" onClick={() => void handleCopyAddress()}>
          <CopyIcon />
          복사
        </button>
      </div>
      <OpenAppCtaButton />
      {isCopyMessageVisible && (
        <CommonToast
          message="복사가 완료되었습니다."
          onClose={hideCopyMessage}
        />
      )}
    </section>
  );
}
