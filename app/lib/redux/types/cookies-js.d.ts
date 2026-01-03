declare module "cookies-js" {
  interface CookiesOptions {
    path?: string;
    domain?: string;
    expires?: number | Date;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  }

  interface Cookies {
    get(key: string): string | undefined;
    set(key: string, value: string, options?: CookiesOptions): string | undefined;
    expire(key: string, options?: CookiesOptions): string | undefined;
    defaults: CookiesOptions;
  }

  const cookies: Cookies;
  export default cookies;
}

