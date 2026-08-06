type KakaoLatLng = object;

type KakaoMapInstance = object;

type KakaoCustomOverlayInstance = {
  setMap: (map: KakaoMapInstance | null) => void;
};

type KakaoAddressSearchResult = {
  x: string;
  y: string;
};

type KakaoGeocoderInstance = {
  addressSearch: (
    address: string,
    callback: (result: KakaoAddressSearchResult[], status: string) => void,
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

export function loadKakaoMapSdk(appKey: string): Promise<KakaoMapsSdk> {
  if (window.kakao?.maps) {
    return new Promise((resolve) => {
      window.kakao?.maps.load(() => resolve(window.kakao!.maps));
    });
  }

  if (kakaoMapSdkPromise) {
    return kakaoMapSdkPromise;
  }

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
