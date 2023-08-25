import "vite/client";

interface ImportMetaEnv {
  readonly VITE_APP_DB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
