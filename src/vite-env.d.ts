/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly KAKAO_MAP_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
