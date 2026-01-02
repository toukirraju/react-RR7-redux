app/
├── lib/                        # Redux & Global Config
│   ├── redux/
│   │   ├── store.ts            # Store + Persistor
│   │   ├── rootReducer.ts      # Reducers + SSR-Safe Persist Config
│   │   └── hooks.ts            # Typed useAppDispatch/Selector
├── features/                   # Domain Logic (Slices & API)
│   ├── auth/
│   │   └── authSlice.ts
│   └── products/
│       ├── productsApi.ts      # RTK Query for product data
│       └── productsSlice.ts
├── components/                 # Shared UI Components
│   ├── layouts/                # Shared Layout Wrappers
│   └── ui/                     # Atomic components (Buttons, etc.)
├── pages/                      # Pure UI Page Views (Business Logic)
│   ├── dashboard/
│   │   └── DashboardPage.tsx
│   ├── products/
│   │   ├── ProductListPage.tsx
│   │   └── ProductDetailsPage.tsx  # Used for Dynamic Slugs
│   └── auth/
│       └── LoginPage.tsx
├── routes/                     # Route Definitions (File-based)
│   ├── _auth.tsx               # Auth Layout Guard
│   ├── _auth.dashboard.tsx     # /dashboard
│   ├── _auth.products._index.tsx # /products (List)
│   ├── _auth.products.$id.tsx  # /products/:id (Dynamic Slug)
│   └── _public.login.tsx       # /login
└── root.tsx                    # Entry Point