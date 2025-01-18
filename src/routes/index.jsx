import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Dashboard } from "../pages/protected/dashboard.jsx";
import { Login } from "../pages/NotProtectedOnly/Login.jsx";
import { Route } from "react-router-dom";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { ProtectedRoute } from "../layouts/ProtectedRoutes";
import { GlobalErrorElement } from "../components/GlobalErrorElement.jsx";
import { ErrorBoundary } from "react-error-boundary";
import { NotProtectedOnlyRoutes } from "../layouts/NotProtectedOnlyRoutes.jsx";
import { Layout } from "../layouts/Layout.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      errorElement={
        <GlobalErrorElement
          error={new Error("Page Not Found")}
          resetErrorBoundary={() => {}}
        />
      }
    >
      {/* Error boundry and Layout is defined here */}
      <Route
        element={
          <ErrorBoundary FallbackComponent={GlobalErrorElement}>
            <Layout />
          </ErrorBoundary>
        }
      >
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
        </Route>

        {/* Public Routes - Authenticated users will be redirected to home */}
        <Route element={<NotProtectedOnlyRoutes />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Public Routes - Accessible to all */}
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Route>
  )
);
