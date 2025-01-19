# React Query + Zustand Authentication Starter

## Project Structure

```bash
src/
├── components/         # Reusable UI components
├── hooks/
│   ├── mutations/     # React Query mutation hooks
│   ├── queries/       # React Query query hooks
│   └── stores/        # Zustand state stores
├── layouts/           # Layout components
├── lib/              # Configuration (axios, react-query)
├── pages/            # Route components
├── services/         # API services
└── routes/           # Route definitions
```

## Authentication Flow

### Auth Store (Zustand)

```javascript
// filepath: /src/hooks/stores/useAuth.js
import { create } from "zustand";
import Cookies from "js-cookie";
import { TOKEN_COOKIE_CONFIG } from "../../config";

const useAuth = create((set) => ({
  accessToken: Cookies.get("accessToken"),
  refreshToken: Cookies.get("refreshToken"),
  isAuthenticated: !!Cookies.get("accessToken"),

  setTokens: (accessToken, refreshToken) => {
    Cookies.set("accessToken", accessToken, TOKEN_COOKIE_CONFIG);
    Cookies.set("refreshToken", refreshToken, TOKEN_COOKIE_CONFIG);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  clearTokens: () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  updateAccessToken: (newAccessToken) => {
    Cookies.set("accessToken", newAccessToken, TOKEN_COOKIE_CONFIG);
    set({
      accessToken: newAccessToken,
    });
  },
}));

export default useAuth;
```

### Login Mutation

```javascript
// filepath: /src/hooks/mutations/auth.js
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import { loginKey } from "../../lib/queryKeys";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = (options) =>
  useMutation({
    mutationKey: loginKey,
    mutationFn: (credentials) => authService.login(credentials),
    ...options,
  });

// Usage in Login.jsx
const loginMutation = useLogin({
  onSuccess: ({ access_token, refresh_token }) => {
    if (!access_token || !refresh_token) {
      throw new Error("Invalid authentication response");
    }
    toast.success("Login successful!");
    navigate("/");
  },
  onError: (error) => {
    if (error.response.status === 401) {
      toast.error("Invalid email or password. Please try again.");
      return;
    }
    toast.error(error.message || "Login failed. Please try again.");
  },
});
```

### User Query

```javascript
// filepath: /src/hooks/queries/useUser.js
import { useQuery } from "@tanstack/react-query";
import { authService } from "../../services/authService";
import useAuth from "../stores/useAuth";
import { userQueryKey } from "../../lib/queryKeys";

export const useUser = () => {
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: [userQueryKey, isAuthenticated],
    queryFn: () => authService.getProfile(),
    enabled: isAuthenticated,
  });
};

// Usage in Dashboard.jsx
const { data: profile, isLoading } = useUser();
```

## Key Features

1. **Token Management**

   - Automatic token refresh
   - Secure cookie storage
   - Access/Refresh token pattern

2. **Protected Routes**

   - Route guards for authenticated routes
   - Public only routes
   - Redirect handling

3. **Error Handling**

   - Global error boundary
   - API error interceptors
   - Form validation
   - Toast notifications

4. **Data Fetching**
   - Automatic caching
   - Loading states
   - Error states
   - Background refetching

## Configuration

### Query Client

```javascript
// filepath: /src/lib/queryClient.js
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});
```

### Axios Interceptors

```javascript
// filepath: /src/lib/axios.js
import axios from "axios";
import Cookies from "js-cookie";
import { authService } from "../services/authService";

const api = axios.create({
  baseURL: "https://api.example.com",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Handle token refresh
      const refreshToken = Cookies.get("refreshToken");
      const { access_token } = await authService.refreshToken(refreshToken);
      // Retry original request
      error.config.headers["Authorization"] = `Bearer ${access_token}`;
      return axios(error.config);
    }
    return Promise.reject(error);
  }
);

export default api;
```

### Query Keys

```javascript
// filepath: /src/lib/queryKeys.js
export const queryKeys = {
  user: "user",
  login: "login",
  profile: "profile",
  // Add other query keys as needed
};
```

### Token Configuration

```javascript
// filepath: /src/config/tokens.js
export const TOKEN_COOKIE_CONFIG = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
};
```

## Store Structure

The application uses multiple Zustand stores for different purposes:

1. **Auth Store**: Manages authentication state
2. **User Store**: Manages user profile data
3. **UI Store**: Manages UI state (loading, modals, etc.)

Example of User Store:

```javascript
// filepath: /src/hooks/stores/useUser.js
import { create } from "zustand";

const useUser = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null }),
}));

export default useUser;
```

## Loading States

The application uses React Query's built-in loading states:

```javascript
// Example usage in components
const { isLoading, isFetching, data } = useQuery({
  queryKey: ["someData"],
  queryFn: fetchData,
});

// Global loading state with Zustand
const useLoadingStore = create((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
```

## Authentication Service

```javascript
// filepath: /src/services/authService.js
import api from "../lib/axios";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  refreshToken: async (refreshToken) => {
    const response = await api.post("/auth/refresh", { refreshToken });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },
};
```

## Protected Routes Implementation

```javascript
// filepath: /src/routes/ProtectedRoute.js
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/stores/useAuth";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
```

## Example Usage

```javascript
// filepath: /src/pages/Login.js
import { useLogin } from '../hooks/mutations/auth';
import useAuth from '../hooks/stores/useAuth';

export const Login = () => {
  const { setTokens } = useAuth();
  const loginMutation = useLogin({
    onSuccess: (data) => {
      setTokens(data.access_token, data.refresh_token);
    }
  });

  const handleSubmit = (credentials) => {
    loginMutation.mutate(credentials);
  };

  return (
    // ... login form implementation
  );
};
```

## Environment Configuration

```javascript
// filepath: /src/config/environment.js
export const environment = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3000",
  tokenExpiryTime: 1000 * 60 * 15, // 15 minutes
  refreshTokenExpiryTime: 1000 * 60 * 60 * 24 * 7, // 7 days
};
```

## Installation and Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
REACT_APP_API_URL=your_api_url
```

4. Start the development server:

```bash
npm start
```

## Dependencies

- React Query v3
- Zustand
- Axios
- React Router v6
- js-cookie
- react-toastify

## Best Practices

1. **Token Management**

   - Store tokens in HTTP-only cookies
   - Implement automatic token refresh
   - Clear tokens on logout

2. **State Management**

   - Use Zustand for global authentication state
   - Persist necessary auth data in cookies
   - Clear state on logout

3. **API Requests**
   - Handle token expiration automatically
   - Implement request/response interceptors
   - Proper error handling
