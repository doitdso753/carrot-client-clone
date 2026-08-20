import type { ReactNode } from 'react';
import KakaoMap from '@/components/ui/map/kakao-map.tsx';

type LocationMapCardProps = {
  placeName: string;
  roadAddress: string;
};

export default function LocationMapCard({
  placeName,
  roadAddress,
}: LocationMapCardProps): ReactNode {
  return (
    <section className="location-map-card" aria-label="위치 정보">
      <KakaoMap address={roadAddress} />
      <div className="location-map-card-address">
        <strong>{placeName}</strong>
        <p>{roadAddress}</p>
      </div>
    </section>
  );
}
