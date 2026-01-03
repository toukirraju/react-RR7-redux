# Redux Setup with Persist Documentation

## Overview

This application uses Redux Toolkit with Redux Persist for state management, configured to store authentication state in cookies instead of localStorage. This setup provides better SSR compatibility and security options.

## Architecture

### Core Components

1. **store.ts** - Redux store configuration with middleware
2. **rootReducer.ts** - Root reducer with persist configuration using cookie storage
3. **baseApi.ts** - RTK Query base API with token refresh logic
4. **hooks.ts** - Typed Redux hooks for TypeScript support

## File Structure

```
app/
├── lib/
│   └── redux/
│       ├── store.ts              # Store configuration + Persistor
│       ├── rootReducer.ts        # Root reducer + Persist config (cookie storage)
│       ├── baseApi.ts            # Base RTK Query API with token refresh
│       ├── hooks.ts              # Typed useAppDispatch/useAppSelector hooks
│       └── types/                # TypeScript declaration files
│           ├── redux-persist-cookie-storage.d.ts
│           └── cookies-js.d.ts
└── features/                     # Feature-based reducers and APIs
    ├── auth/
    │   ├── authSlice.ts
    │   ├── authApi.ts
    │   └── authSelectors.ts
    └── products/
        ├── productsSlice.ts
        └── productsApi.ts
```

## Store Configuration

### store.ts

The store is configured with:

- **Persisted Reducer**: Root reducer wrapped with redux-persist
- **RTK Query Middleware**: For API caching and invalidation
- **Serializable Check**: Configured to ignore persist actions

```typescript
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { persistedReducer } from "./rootReducer";
import { baseApi } from "./baseApi";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Root Reducer with Cookie Storage

The `rootReducer.ts` file configures Redux Persist to use cookie storage instead of localStorage:

```typescript
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "cookies-js";
import authReducer from "~/features/auth/authSlice";
import productsReducer from "~/features/products/productsSlice";
import { baseApi } from "./baseApi";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? new CookieStorage(Cookies, {
        expiration: {
          default: 365 * 86400,
        },
        setCookieOptions: {
          path: "/",
          secure: true,
        },
      })
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "theme"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
```

## Cookie Storage Configuration

### Why Cookie Storage?

- **SSR Compatibility**: Cookies work seamlessly with server-side rendering
- **Security**: Can use secure flags and httpOnly options
- **Automatic Transmission**: Cookies are automatically sent with HTTP requests
- **Cross-Subdomain**: Can be configured to work across subdomains

### Configuration Options

```typescript
new CookieStorage(Cookies, {
  expiration: {
    default: 365 * 86400,  // 1 year in seconds
  },
  setCookieOptions: {
    path: "/",             // Cookie available across entire site
    secure: true,          // Only sent over HTTPS
  },
})
```

**Expiration Options:**
- `default`: Default expiration time for all stored keys (in seconds)
- Specific keys can have custom expiration times

**Cookie Options:**
- `path`: Cookie path (default: "/")
- `domain`: Cookie domain
- `secure`: Only sent over HTTPS (default: false)
- `sameSite`: CSRF protection ("strict" | "lax" | "none")

### SSR Safety

The configuration includes a `createNoopStorage()` function for server-side rendering:

- On the server (`typeof window === "undefined"`): Uses noop storage
- On the client: Uses cookie storage
- Prevents hydration mismatches and SSR errors

## Persist Configuration

### Whitelist

Only specific reducers are persisted:

```typescript
whitelist: ["auth", "theme"]
```

- **auth**: Authentication state (token, refreshToken, user)
- **theme**: Theme preferences
- **products**: Not persisted (fetched from API when needed)
- **baseApi**: RTK Query cache (not persisted)

### Blacklist (Alternative)

You can use `blacklist` instead of `whitelist`:

```typescript
blacklist: ["products", baseApi.reducerPath]
```

## Provider Setup

The store and persistor are provided at the root level in `root.tsx`:

```typescript
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "~/lib/redux/store";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
```

**PersistGate** ensures the app waits for state rehydration before rendering, preventing authentication state from being undefined on initial load.

## Typed Hooks

### hooks.ts

Custom typed hooks provide type safety:

```typescript
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
```

### Usage

```typescript
import { useAppDispatch, useAppSelector } from "~/lib/redux/hooks";
import { selectUser } from "~/features/auth/authSelectors";

function MyComponent() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return <div>Welcome, {user?.firstName}!</div>;
}
```

## TypeScript Declarations

Since `redux-persist-cookie-storage` and `cookies-js` don't have built-in TypeScript types, custom declaration files are provided:

### redux-persist-cookie-storage.d.ts

```typescript
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
}
```

### cookies-js.d.ts

```typescript
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
```

## Installation

### Required Packages

```bash
npm install @reduxjs/toolkit react-redux redux-persist redux-persist-cookie-storage cookies-js
```

### Package Versions

- `@reduxjs/toolkit`: ^2.11.2
- `react-redux`: ^9.2.0
- `redux-persist`: ^6.0.0
- `redux-persist-cookie-storage`: ^1.0.0
- `cookies-js`: ^1.2.3

## Usage Examples

### Accessing Store State

```typescript
import { useAppSelector } from "~/lib/redux/hooks";
import { selectIsAuthenticated, selectUser } from "~/features/auth/authSelectors";

function ProfilePage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome, {user?.firstName} {user?.lastName}!</div>;
}
```

### Dispatching Actions

```typescript
import { useAppDispatch } from "~/lib/redux/hooks";
import { logout } from "~/features/auth/authSlice";

function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Using RTK Query

```typescript
import { useGetProductsQuery } from "~/features/products/productsApi";

function ProductsList() {
  const { data, isLoading, error } = useGetProductsQuery({ skip: 0, limit: 30 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      {data?.products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

## State Persistence Flow

1. **Initial Load**: App starts, PersistGate waits for state rehydration
2. **Rehydration**: Redux Persist reads state from cookies
3. **State Restored**: Store is populated with persisted state
4. **App Renders**: PersistGate releases, app renders with restored state
5. **State Updates**: All state changes are automatically persisted to cookies
6. **Page Refresh**: Process repeats, state is restored from cookies

## Benefits of Cookie Storage

### vs localStorage

- ✅ Better SSR compatibility
- ✅ Automatic transmission with requests
- ✅ Security options (secure, httpOnly, sameSite)
- ✅ Works across subdomains (with domain configuration)
- ✅ Smaller size limit (4KB vs 5-10MB)

### Security Considerations

1. **Secure Flag**: Cookies are only sent over HTTPS when `secure: true`
2. **HttpOnly**: Consider httpOnly cookies for tokens (requires server-side handling)
3. **SameSite**: Prevents CSRF attacks when set to "strict" or "lax"
4. **Expiration**: Set appropriate expiration times for sensitive data

## Troubleshooting

### State Not Persisting

- Check if reducer is in whitelist
- Verify cookie storage is working (check browser DevTools > Application > Cookies)
- Ensure `secure: true` is not set when testing on HTTP (localhost)

### Hydration Mismatches

- Ensure noop storage is used on server side
- Check for state-dependent rendering before rehydration
- Use PersistGate to wait for rehydration

### Cookie Not Being Set

- Verify `secure: true` is not set when using HTTP
- Check cookie path matches your route paths
- Ensure cookies are not blocked by browser settings

### TypeScript Errors

- Ensure type declaration files are in the correct location
- Check that TypeScript can find the declaration files
- Verify module names match exactly

## Best Practices

1. **Use Typed Hooks**: Always use `useAppDispatch` and `useAppSelector`
2. **Use Selectors**: Prefer memoized selectors over direct state access
3. **Whitelist Only What's Needed**: Don't persist everything
4. **Secure Cookies in Production**: Always use `secure: true` in production
5. **Set Appropriate Expiration**: Don't store tokens indefinitely
6. **Handle Rehydration**: Wait for PersistGate before rendering auth-dependent UI

## Migration from localStorage

If migrating from localStorage to cookie storage:

1. Update `rootReducer.ts` to use `CookieStorage`
2. Install required packages
3. Add type declarations
4. Test state persistence
5. Clear old localStorage data if needed
6. Update documentation

## References

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Redux Persist Documentation](https://github.com/rt2zz/redux-persist)
- [redux-persist-cookie-storage](https://github.com/abersager/redux-persist-cookie-storage)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)

