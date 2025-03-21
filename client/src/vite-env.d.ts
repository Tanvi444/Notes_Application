/// <reference types="vite/client" />

declare global {
  namespace NodeJs {
    interface ImportMeta {
      readonly env: {
        readonly VITE_SERVER_BASE_URL: string;
      };
    }
  }
}
