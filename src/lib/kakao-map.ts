type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

type KakaoMapInstance = {
  getBounds: () => KakaoLatLngBounds;
  getCenter: () => KakaoLatLng;
};

type KakaoLatLngBounds = {
  getNorthEast: () => KakaoLatLng;
  getSouthWest: () => KakaoLatLng;
};

type KakaoCustomOverlayInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
};

type KakaoAddressSearchResult = {
  x: string;
  y: string;
};

export type KakaoRegionCodeResult = {
  address_name: string;
  code: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_4depth_name: string;
  region_type: 'B' | 'H';
};

type KakaoGeocoderInstance = {
  addressSearch: (
    address: string,
    callback: (result: KakaoAddressSearchResult[], status: string) => void,
  ) => void;
  coord2RegionCode: (
    longitude: number,
    latitude: number,
    callback: (result: KakaoRegionCodeResult[], status: string) => void,
  ) => void;
};

type KakaoMapsSdk = {
  load: (callback: () => void) => void;
  LatLng: new (latitude: number, longitude: number) => KakaoLatLng;
  Map: new (
    container: HTMLElement,
    options: { center: KakaoLatLng; level: number },
  ) => KakaoMapInstance;
  CustomOverlay: new (options: {
    map: KakaoMapInstance;
    position: KakaoLatLng;
    content: HTMLElement;
    xAnchor: number;
    yAnchor: number;
  }) => KakaoCustomOverlayInstance;
  event: {
    addListener: (
      target: KakaoMapInstance,
      type: 'dragend',
      handler: () => void,
    ) => void;
    removeListener: (
      target: KakaoMapInstance,
      type: 'dragend',
      handler: () => void,
    ) => void;
  };
  services: {
    Geocoder: new () => KakaoGeocoderInstance;
    Status: {
      OK: string;
    };
  };
};

declare global {
  interface Window {
    kakao?: {
      maps: KakaoMapsSdk;
    };
  }
}

let kakaoMapSdkPromise: Promise<KakaoMapsSdk> | null = null;

// SDK 스크립트를 한 번만 로드하고 이후 호출에는 같은 Promise 재사용
export function loadKakaoMapSdk(appKey: string): Promise<KakaoMapsSdk> {
  // 전역 SDK가 이미 존재하면 maps 모듈 초기화만 대기
  if (window.kakao?.maps) {
    return new Promise((resolve) => {
      window.kakao?.maps.load(() => resolve(window.kakao!.maps));
    });
  }

  if (kakaoMapSdkPromise) {
    return kakaoMapSdkPromise;
  }

  // 주소·좌표 변환을 위한 services 라이브러리와 SDK 스크립트 로드
  kakaoMapSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${encodeURIComponent(appKey)}&autoload=false&libraries=services`;
    script.async = true;
    script.addEventListener('load', () => {
      if (!window.kakao?.maps) {
        reject(new Error('카카오맵 SDK를 초기화하지 못했습니다.'));
        return;
      }

      window.kakao.maps.load(() => resolve(window.kakao!.maps));
    });
    script.addEventListener('error', () => {
      reject(new Error('카카오맵 SDK를 불러오지 못했습니다.'));
    });
    document.head.appendChild(script);
  });

  return kakaoMapSdkPromise;
}
