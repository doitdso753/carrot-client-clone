/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly KAKAO_MAP_APP_KEY: string;
  readonly APP_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
