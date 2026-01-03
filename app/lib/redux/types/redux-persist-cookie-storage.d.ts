declare module "redux-persist-cookie-storage" {
  export interface CookieStorageOptions {
    expiration?: {
      default?: number | null;
      [key: string]: number | null | undefined;
    };
    setCookieOptions?: {
      path?: string;
      domain?: string;
      secure?: boolean;
      sameSite?: "strict" | "lax" | "none";
    };
  }

  export class CookieStorage {
    constructor(cookies: any, options?: CookieStorageOptions);
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  }

  export class NodeCookiesWrapper {
    constructor(cookies: any);
  }
}
