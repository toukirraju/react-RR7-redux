# React Router v7 Routing Guide

## Overview

This application uses React Router v7 with file-based routing. Routes are defined in the `app/routes/` directory and configured in `app/routes.ts`.

## Important: Default Exports Required

**⚠️ CRITICAL:** All route files MUST export a default function. Named exports will not work for route components.

```typescript
// ✅ CORRECT
export default function Dashboard() {
  return <DashboardPage />;
}

// ❌ WRONG - Will not work
export function Dashboard() {
  return <DashboardPage />;
}
```

## Route File Structure

### Layout Routes

Layout routes use the `_` prefix and export a `Layout` function (or default export):

```typescript
// routes/_auth.tsx
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "~/lib/redux/hooks";
import { AppShell } from "@mantine/core";
import { SideNav } from "~/components/ui/SideNav";
import { selectIsAuthenticated } from "~/features/auth/authSelectors";

export default function Layout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector((state) => state.auth.token);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell navbar={{ width: 280, breakpoint: "sm" }} padding="md">
      <AppShell.Navbar>
        <SideNav />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
```

### Regular Routes

Regular routes export a default component:

```typescript
// routes/_auth.dashboard.tsx
import type { Route } from "./+types/_auth.dashboard";
import { DashboardPage } from "~/pages/dashboard/DashboardPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "User dashboard" },
  ];
}

export default function Dashboard() {
  return <DashboardPage />;
}
```

## Route Naming Conventions

### File Naming

- `_auth.tsx` - Layout route (protected routes)
- `_auth.dashboard.tsx` - `/dashboard` route under auth layout
- `_auth.products._index.tsx` - `/products` route (index route)
- `_auth.products.$id.tsx` - `/products/:id` route (dynamic parameter)
- `_public.login.tsx` - `/login` route (public route)
- `home.tsx` - `/` route (root route)
- `$.tsx` - Catch-all route for 404s

### Route Configuration

Routes are configured in `app/routes.ts`:

```typescript
import { type RouteConfig, route, layout } from "@react-router/dev/routes";

export default [
  layout("routes/_auth.tsx", [
    route("dashboard", "routes/_auth.dashboard.tsx"),
    route("products", "routes/_auth.products._index.tsx"),
    route("products/:id", "routes/_auth.products.$id.tsx"),
    route("profile", "routes/_auth.profile.tsx"),
    route("analytics", "routes/_auth.analytics.tsx"),
    route("settings", "routes/_auth.settings.tsx"),
  ]),
  route("login", "routes/_public.login.tsx"),
  route("/", "routes/home.tsx"),
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
```

## Route Types

### Protected Routes

Protected routes are nested under the `_auth` layout:

```typescript
// routes/_auth.dashboard.tsx
export default function Dashboard() {
  return <DashboardPage />;
}
```

These routes automatically:
- Check authentication status
- Redirect to `/login` if not authenticated
- Show the side navigation
- Use the AppShell layout

### Public Routes

Public routes can have their own layout:

```typescript
// routes/_public.login.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <PublicLayout>{children}</PublicLayout>;
}

export default function Login() {
  return <LoginPage />;
}
```

### Dynamic Routes

Dynamic routes use `$` prefix for parameters:

```typescript
// routes/_auth.products.$id.tsx
import type { Route } from "./+types/_auth.products.$id";
import { ProductDetailsPage } from "~/pages/products/ProductDetailsPage";

export default function ProductDetails({ params }: Route.ComponentProps) {
  return <ProductDetailsPage />;
}
```

Access the parameter via `params.id` in the component.

### Index Routes

Index routes use `_index` in the filename:

```typescript
// routes/_auth.products._index.tsx
export default function Products() {
  return <ProductListPage />;
}
```

## Route Metadata

Use the `meta` function to set page metadata:

```typescript
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "User dashboard" },
  ];
}
```

## Route Guards

### Authentication Guard

The `_auth` layout automatically guards all nested routes:

```typescript
export default function Layout() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector((state) => state.auth.token);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
```

### Redirect Logic

Routes can redirect based on authentication:

```typescript
// routes/home.tsx
export default function Home() {
  const token = useAppSelector((state) => state.auth.token);
  
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Navigate to="/login" replace />;
}
```

## Catch-All Route

Handle 404s and unknown routes:

```typescript
// routes/$.tsx
export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith("/.well-known/")) {
    return new Response(null, { status: 404 });
  }
  
  throw new Response("Not Found", { status: 404 });
}

export default function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}
```

## Common Patterns

### Loading States

```typescript
export default function Dashboard() {
  const { data, isLoading } = useGetDashboardDataQuery();
  
  if (isLoading) {
    return <Loader />;
  }
  
  return <DashboardPage data={data} />;
}
```

### Error Handling

```typescript
export default function Products() {
  const { data, error } = useGetProductsQuery();
  
  if (error) {
    return <Alert color="red">Error loading products</Alert>;
  }
  
  return <ProductListPage products={data} />;
}
```

## Best Practices

1. **Always use default exports** for route components
2. **Use Layout function** for layout routes (can be default export)
3. **Type your routes** using generated types from `+types/` directory
4. **Handle loading and error states** in route components
5. **Use selectors** for accessing Redux state
6. **Keep route files simple** - delegate to page components
7. **Use meta function** for SEO and page titles

## Troubleshooting

### Route not rendering

- Check that the route file exports a default function
- Verify the route is configured in `routes.ts`
- Check browser console for errors
- Run `npm run typecheck` to verify types

### Layout not showing

- Ensure layout route exports `Layout` function (or default)
- Verify `Outlet` is used in layout to render child routes
- Check that routes are nested under the layout in `routes.ts`

### Redirect loops

- Verify authentication state is properly initialized
- Check that redirect conditions are correct
- Ensure `replace` prop is used in `Navigate` component

