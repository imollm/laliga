interface ImportMetaEnv {
    readonly NOTION_APIKEY: string;
    readonly NOTION_URL: string;
    readonly NOTION_VERSION: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }