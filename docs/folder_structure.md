```
app/
├── lib/                        # Redux & Global Config
│   └── redux/
│       ├── baseApi.ts          # Base query with refresh token logic
│       ├── store.ts            # Store + Persistor
│       ├── rootReducer.ts      # Reducers + SSR-Safe Persist Config
│       └── hooks.ts            # Typed useAppDispatch/Selector
├── features/                   # Domain Logic (Slices & API)
│   ├── auth/
│   │   ├── authApi.ts          # Auth API endpoints (RTK Query)
│   │   ├── authSlice.ts        # Auth state slice
│   │   └── authSelectors.ts    # Auth selectors
│   ├── products/
│   │   ├── productsApi.ts      # RTK Query for product data
│   │   └── productsSlice.ts
│   └── theme/
│       └── themeSlice.ts       # Theme state slice
├── components/                 # Shared UI Components
│   ├── layouts/                # Shared Layout Wrappers
│   │   ├── AuthLayout.tsx     # Authenticated layout with SideNav
│   │   ├── PublicLayout.tsx   # Public pages layout
│   │   └── index.ts           # Layout exports
│   └── ui/                     # Atomic components
│       ├── Button.tsx          # Reusable button component
│       ├── SideNav.tsx         # Side navigation component
│       └── index.ts            # UI component exports
├── pages/                      # Pure UI Page Views (Business Logic)
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── products/
│   │   ├── ProductListPage.tsx
│   │   └── ProductDetailsPage.tsx  # Used for Dynamic Slugs
│   ├── auth/
│   │   └── LoginPage.tsx
│   ├── profile/
│   │   └── ProfilePage.tsx
│   ├── analytics/
│   │   └── AnalyticsPage.tsx
│   ├── settings/
│   │   └── SettingsPage.tsx
│   └── home/
│       └── HomePage.tsx        # Home page with documentation
├── providers/                  # Context Providers
│   ├── app-theme.tsx          # Mantine theme provider wrapper
│   └── index.ts               # Provider exports
├── hooks/                      # Custom React Hooks
│   └── index.ts               # Hook exports
├── routes/                     # Route Definitions (File-based)
│   ├── _auth.tsx               # Auth Layout (exports default Layout)
│   ├── _auth.dashboard.tsx     # /dashboard
│   ├── _auth.products._index.tsx # /products (List)
│   ├── _auth.products.$id.tsx  # /products/:id (Dynamic Slug)
│   ├── _auth.profile.tsx       # /profile
│   ├── _auth.analytics.tsx     # /analytics
│   ├── _auth.settings.tsx      # /settings
│   ├── _public.tsx             # Public layout
│   ├── _public.login.tsx       # /login
│   ├── home.tsx                # / (root route)
│   └── $.tsx                   # Catch-all 404 route
├── routes.ts                   # Route configuration
├── root.tsx                    # Entry Point
└── app.css                     # Global styles
```