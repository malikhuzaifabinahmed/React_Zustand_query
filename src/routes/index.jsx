import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/protected/Home.jsx';
import { Login } from '../pages/protected/Login.jsx';
import { Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { ProtectedRoute } from '../layouts/ProtectedRoutes';
import { GlobalErrorElement } from '../lib/GlobalErrorElement';
import { GlobalLayout } from '../lib/GlobalLayout';
import { ErrorBoundary } from 'react-error-boundary';
import { NotProtectedRoutes } from '../layouts/NotProtectedRoutes.jsx';
import { TOKEN_COOKIE_CONFIG } from '../config.js';
import { api } from '../lib/axios.js';


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        const { access_token, refresh_token } = await authService.refreshToken(refreshToken);

        // Update cookies
        Cookies.set('accessToken', access_token, TOKEN_COOKIE_CONFIG);
        Cookies.set('refreshToken', refresh_token, TOKEN_COOKIE_CONFIG);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (err) {
        // If refresh fails, logout user
        authService.logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={
      <GlobalErrorElement
        error={new Error("Page Not Found")}
        resetErrorBoundary={() => { }}
      />
    }
      element={<GlobalLayout />} >

      {/* Error boundry and Layout is defined here */}
      <Route element={<ErrorBoundary FallbackComponent={GlobalErrorElement} ><Layout /> </ErrorBoundary>}>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/"
            element={
              <Home />

            }
          />
        </Route>
        {/* Public Routes - Authenticated users will be redirected to home */}
        <Route element={<NotProtectedRoutes />}  >
          <Route
            path="login"
            element={
              <Login />
            }
          />

        </Route>

        {/* Public Routes - Accessible to all */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

    </Route >
  )
);


