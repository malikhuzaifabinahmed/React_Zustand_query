import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/protected/Home.jsx';
import { Login } from '../pages/protected/Login.jsx';
import { Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Contact } from '../pages/Contact';
import { ProtectedRoute } from '../layouts/ProtectedRoutes';
import { GlobalErrorElement } from '../components/GlobalErrorElement.jsx';
import { GlobalLayout } from '../components/GlobalLayout.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { NotProtectedRoutes } from '../layouts/NotProtectedRoutes.jsx';



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


