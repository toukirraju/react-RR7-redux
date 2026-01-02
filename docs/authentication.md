# Authentication System Documentation

## Overview

This application implements a complete authentication system using Redux Toolkit Query (RTK Query) with automatic token refresh using `async-mutex` to prevent race conditions. The system integrates with the [DummyJSON API](https://dummyjson.com/docs/auth) for authentication endpoints.

## Architecture

### Core Components

1. **baseApi.ts** - Base API configuration with automatic token refresh
2. **authApi.ts** - Authentication API endpoints
3. **authSlice.ts** - Redux slice for auth state management
4. **authSelectors.ts** - Memoized selectors for auth state

## File Structure

```
app/
├── lib/
│   └── redux/
│       ├── baseApi.ts          # Base query with refresh token logic
│       ├── store.ts            # Redux store configuration
│       ├── rootReducer.ts      # Root reducer with persist config
│       └── hooks.ts            # Typed Redux hooks
└── features/
    └── auth/
        ├── authApi.ts          # Auth API endpoints (RTK Query)
        ├── authSlice.ts        # Auth state slice
        └── authSelectors.ts    # Auth selectors
```

## How It Works

### 1. Base API with Token Refresh

The `baseApi.ts` file implements a custom base query that:

- Automatically adds the access token to all API requests
- Intercepts 401 (Unauthorized) responses
- Uses `async-mutex` to prevent multiple simultaneous refresh requests
- Automatically refreshes the token when it expires
- Logs out the user if refresh fails

**Key Features:**
- **Mutex Protection**: Uses `async-mutex` to ensure only one refresh request happens at a time
- **Automatic Retry**: After successful token refresh, the original failed request is retried
- **State Management**: Updates Redux store with new tokens after refresh

### 2. Authentication API

The `authApi.ts` provides the following endpoints:

- **login**: Authenticate user with username and password
- **refreshToken**: Refresh access token using refresh token
- **getMe**: Get current authenticated user information
- **logout**: Logout the current user

All endpoints use the base API which handles token management automatically.

**Important:** The DummyJSON API returns `accessToken` in the response, which is automatically mapped to `token` in the Redux state for consistency.

### 3. Auth State Management

The `authSlice.ts` manages:

- `token`: Access token for API requests
- `refreshToken`: Refresh token for obtaining new access tokens
- `user`: Current authenticated user information

The slice automatically updates when:
- User logs in successfully
- Token is refreshed
- User data is fetched
- User logs out

## Usage

### Login

```typescript
import { useLoginMutation } from "~/features/auth/authApi";

function LoginPage() {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ 
        username: "emilys", 
        password: "emilyspass" 
      }).unwrap();
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

### Accessing Auth State

```typescript
import { useAppSelector } from "~/lib/redux/hooks";
import { selectUser, selectIsAuthenticated, selectToken } from "~/features/auth/authSelectors";

function MyComponent() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const token = useAppSelector(selectToken);

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return <div>Welcome, {user?.firstName}!</div>;
}
```

### Making Authenticated API Calls

All API calls using the base API automatically include the access token:

```typescript
import { useGetProductsQuery } from "~/features/products/productsApi";

function ProductsPage() {
  // This automatically includes the Bearer token in headers
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

### Logout

```typescript
import { useLogoutMutation } from "~/features/auth/authApi";
import { useNavigate } from "react-router";

function LogoutButton() {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "Logging out..." : "Logout"}
    </button>
  );
}
```

## Token Refresh Flow

1. **User makes API request** → Request includes access token in Authorization header
2. **API returns 401** → Base query intercepts the error
3. **Check if mutex is locked** → If another refresh is in progress, wait
4. **Acquire mutex** → Lock to prevent concurrent refresh requests
5. **Call refresh endpoint** → Use refresh token to get new access token
6. **Update Redux store** → Save new tokens to state
7. **Retry original request** → Retry the failed request with new token
8. **Release mutex** → Allow other requests to proceed

## DummyJSON API Endpoints

The system uses the following DummyJSON endpoints:

- **POST /auth/login** - Login with username and password
- **POST /auth/refresh** - Refresh access token
- **GET /auth/me** - Get current user (requires authentication)
- **POST /auth/logout** - Logout (optional, handled client-side)

### Demo Credentials

- Username: `emilys`
- Password: `emilyspass`

## State Persistence

Authentication state is persisted to localStorage using `redux-persist`:

- Tokens are stored securely in localStorage
- State is rehydrated on app load
- User remains logged in across page refreshes

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage (consider httpOnly cookies for production)
2. **HTTPS**: Always use HTTPS in production to protect tokens in transit
3. **Token Expiration**: Access tokens should have short expiration times
4. **Refresh Token Rotation**: Consider implementing refresh token rotation for enhanced security
5. **Logout on Refresh Failure**: System automatically logs out if refresh fails

## Error Handling

The system handles various error scenarios:

- **401 Unauthorized**: Automatically attempts token refresh
- **Refresh Failure**: Logs out user and redirects to login
- **Network Errors**: Propagated to components for user feedback
- **Invalid Credentials**: Displayed to user via error state

## Testing

To test the authentication system:

1. Navigate to `/login`
2. Use demo credentials: `emilys` / `emilyspass`
3. After login, navigate to protected routes
4. Tokens are automatically refreshed when they expire
5. Test logout functionality

## Troubleshooting

### Token not being sent

- Check if user is logged in: `useAppSelector(selectIsAuthenticated)`
- Verify token exists: `useAppSelector(selectToken)`
- Check Redux DevTools for auth state

### Refresh token not working

- Verify refresh token exists in state
- Check network tab for refresh endpoint calls
- Ensure mutex is not causing deadlocks

### User logged out unexpectedly

- Check if refresh token expired
- Verify API endpoint responses
- Check browser console for errors

## Future Enhancements

- [ ] Implement refresh token rotation
- [ ] Add token expiration warnings
- [ ] Implement remember me functionality
- [ ] Add two-factor authentication support
- [ ] Implement session timeout handling
- [ ] Add biometric authentication support

