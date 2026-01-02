# Documentation Index

This directory contains comprehensive documentation for the React Router v7 + Redux Toolkit application.

## Documentation Files

### [Authentication System](./authentication.md)
Complete guide to the authentication system, including:
- Architecture overview
- Token refresh mechanism
- Usage examples
- Security considerations
- Troubleshooting guide

### [API Reference](./api_reference.md)
Complete API reference for:
- Authentication endpoints
- Products endpoints
- Redux selectors and actions
- Type definitions

### [Folder Structure](./folder_structure.md)
Enterprise-grade folder structure documentation:
- Directory organization
- File naming conventions
- Feature-based architecture
- Route definitions

### [Routing Guide](./routing.md)
Complete guide to React Router v7 file-based routing:
- Route file structure
- Layout routes
- Dynamic routes
- Route guards
- **Important: Default exports required**

## Quick Start

### Authentication Flow

1. **Login**: User submits credentials via `useLoginMutation()`
2. **Token Storage**: Tokens are stored in Redux state and persisted to localStorage
3. **API Requests**: All requests automatically include the access token
4. **Token Refresh**: Expired tokens are automatically refreshed using async-mutex
5. **Logout**: User can logout, clearing all authentication state

### Example: Protected Route

```typescript
import { useAppSelector } from "~/lib/redux/hooks";
import { selectIsAuthenticated } from "~/features/auth/authSelectors";

function ProtectedComponent() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Protected Content</div>;
}
```

### Example: Making Authenticated API Calls

```typescript
import { useGetProductsQuery } from "~/features/products/productsApi";

function ProductsList() {
  // Token is automatically included in the request
  const { data, isLoading } = useGetProductsQuery({ skip: 0, limit: 30 });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data?.products.map(product => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
}
```

## Key Features

### ✅ Automatic Token Refresh
- Uses `async-mutex` to prevent race conditions
- Automatically retries failed requests after refresh
- Seamless user experience

### ✅ Type Safety
- Full TypeScript support
- Typed Redux hooks
- Type-safe API endpoints

### ✅ State Persistence
- Redux Persist integration
- Survives page refreshes
- SSR-safe implementation

### ✅ Enterprise Architecture
- Feature-based folder structure
- Separation of concerns
- Scalable and maintainable

## Technology Stack

- **React Router v7**: File-based routing
- **Redux Toolkit**: State management
- **RTK Query**: Data fetching and caching
- **async-mutex**: Token refresh synchronization
- **Mantine UI**: Component library
- **TypeScript**: Type safety
- **redux-persist**: State persistence

## API Integration

The application uses the [DummyJSON API](https://dummyjson.com/docs/auth) for:
- Authentication endpoints
- Product data
- User management

### Demo Credentials
- **Username**: `emilys`
- **Password**: `emilyspass`

## Development

### Running the Application

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

### Type Checking

```bash
npm run typecheck
```

## Best Practices

1. **Always use default exports for routes**: Route components must export default
2. **Always use typed hooks**: `useAppDispatch` and `useAppSelector`
3. **Use selectors**: Prefer memoized selectors over direct state access
4. **Handle loading states**: Always check `isLoading` before rendering data
5. **Error handling**: Provide user-friendly error messages
6. **Token management**: Let the base API handle token refresh automatically
7. **Layout routes**: Use `Outlet` to render child routes in layouts

## Support

For issues or questions:
1. Check the [Authentication System](./authentication.md) documentation
2. Review the [API Reference](./api_reference.md)
3. Check the [Folder Structure](./folder_structure.md) guide

## License

This project is part of an enterprise-grade React application template.

