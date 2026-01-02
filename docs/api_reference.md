# API Reference

## Authentication API

### `authApi`

RTK Query API slice for authentication operations.

#### Endpoints

##### `login`

Authenticate a user with username and password.

**Mutation Hook**: `useLoginMutation()`

**Request:**
```typescript
{
  username: string;
  password: string;
}
```

**Response:**
```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
```

**Note:** The API returns `accessToken` which is automatically mapped to `token` in the Redux state.

**Example:**
```typescript
const [login, { isLoading, error }] = useLoginMutation();

await login({ 
  username: "emilys", 
  password: "emilyspass" 
}).unwrap();
```

##### `refreshToken`

Refresh the access token using a refresh token.

**Mutation Hook**: `useRefreshTokenMutation()`

**Request:**
```typescript
{
  refreshToken: string;
}
```

**Response:**
```typescript
{
  accessToken: string;
  refreshToken: string;
}
```

**Note:** The API returns `accessToken` which is automatically mapped to `token` in the Redux state.

**Example:**
```typescript
const [refreshToken] = useRefreshTokenMutation();

await refreshToken({ 
  refreshToken: "your-refresh-token" 
}).unwrap();
```

##### `getMe`

Get the current authenticated user's information.

**Query Hook**: `useGetMeQuery()`

**Response:**
```typescript
{
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
```

**Example:**
```typescript
const { data: user, isLoading, error } = useGetMeQuery();
```

##### `logout`

Logout the current user.

**Mutation Hook**: `useLogoutMutation()`

**Example:**
```typescript
const [logout, { isLoading }] = useLogoutMutation();

await logout().unwrap();
```

## Products API

### `productsApi`

RTK Query API slice for product operations.

#### Endpoints

##### `getProducts`

Get a paginated list of products.

**Query Hook**: `useGetProductsQuery(params)`

**Parameters:**
```typescript
{
  skip?: number;  // Default: 0
  limit?: number; // Default: 30
}
```

**Response:**
```typescript
{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

**Example:**
```typescript
const { data, isLoading, error } = useGetProductsQuery({ 
  skip: 0, 
  limit: 30 
});
```

##### `getProductById`

Get a single product by ID.

**Query Hook**: `useGetProductByIdQuery(id)`

**Parameters:**
```typescript
id: number
```

**Response:**
```typescript
{
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
```

**Example:**
```typescript
const { data: product, isLoading } = useGetProductByIdQuery(1);
```

##### `searchProducts`

Search for products by query term.

**Query Hook**: `useSearchProductsQuery(searchTerm)`

**Parameters:**
```typescript
searchTerm: string
```

**Response:**
```typescript
{
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
```

**Example:**
```typescript
const { data } = useSearchProductsQuery("laptop");
```

## Base API

### `baseQueryWithReauth`

Custom base query that handles authentication and token refresh automatically.

**Features:**
- Automatically adds `Authorization: Bearer <token>` header to all requests
- Intercepts 401 responses and attempts token refresh
- Uses mutex to prevent concurrent refresh requests
- Retries failed requests after successful token refresh
- Logs out user if refresh fails

**Usage:**
All APIs using this base query automatically benefit from token management.

## Redux Selectors

### Auth Selectors

#### `selectAuth`

Get the entire auth state.

```typescript
const auth = useAppSelector(selectAuth);
```

#### `selectToken`

Get the current access token.

```typescript
const token = useAppSelector(selectToken);
```

#### `selectRefreshToken`

Get the current refresh token.

```typescript
const refreshToken = useAppSelector(selectRefreshToken);
```

#### `selectUser`

Get the current authenticated user.

```typescript
const user = useAppSelector(selectUser);
```

#### `selectIsAuthenticated`

Check if user is authenticated.

```typescript
const isAuthenticated = useAppSelector(selectIsAuthenticated);
```

## Redux Actions

### Auth Actions

#### `setCredentials`

Set authentication credentials.

```typescript
dispatch(setCredentials({
  token: string;
  refreshToken?: string;
  user: User | null;
}));
```

#### `logout`

Clear authentication state and log out user.

```typescript
dispatch(logout());
```

## Type Definitions

### `LoginCredentials`

```typescript
interface LoginCredentials {
  username: string;
  password: string;
}
```

### `AuthResponse`

```typescript
interface AuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
```

**Note:** The API returns `accessToken`, but it's stored as `token` in Redux state for consistency.

### `User`

```typescript
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
```

### `Product`

```typescript
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
```

### `AuthState`

```typescript
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}
```

