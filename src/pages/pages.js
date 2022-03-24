import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "hooks/ProtectedRoute";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const HomePage = lazy(() => import("pages/HomePage/HomePage"));
const All = lazy(() => import("pages/All/All"));
const Create = lazy(() => import("pages/Create/Create"));
const Details = lazy(() => import("pages/Details/Details"));
const MyFurniture = lazy(() => import("pages/MyFurniture/MyFurniture"));
// const ChangeUsername = lazy(() =>
//   import("pages/ChangeUsername/ChangeUsername")
// );
// const Stats = lazy(() => import("pages/Stats/Stats"));

// const ChangePassword = lazy(() =>
//   import("pages/ChangePassword/ChangePassword")
// );
// const Cart = lazy(() => import("pages/Cart/Cart"));
const SearchedAll = lazy(() => import("pages/SearchedAll/SearchedAll"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/furniture/all"
        element={
          <ProtectedRoute>
            <All />
          </ProtectedRoute>
        }
      />
      <Route
        path="/furniture/allSearched"
        element={
          <ProtectedRoute>
            <SearchedAll />
          </ProtectedRoute>
        }
      />
      <Route
        path="/furniture/create"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route
        path="/furniture/edit/:id"
        element={
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        }
      />
      <Route
        path="/furniture/my-furniture"
        element={
          <ProtectedRoute>
            <MyFurniture />
          </ProtectedRoute>
        }
      />
      <Route
        path="/furniture/details/:id"
        element={
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        }
      />

      {/* <ProtectedRoute
        exact
        path="/change-username"
        component={ChangeUsername}
      />
      <ProtectedRoute
        exact
        path="/change-password"
        component={ChangePassword}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/stats" component={Stats} /> */}
      <Route path="*" component={NotFound} />
    </Routes>
  );
};
