import { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "hooks/ProtectedRoute";
const NotFound = lazy(() => import("components/NotFound/NotFound"));
const HomePage = lazy(() => import("pages/HomePage/HomePage"));
const All = lazy(() => import("pages/All/All"));
const Create = lazy(() => import("pages/Create/Create"));
const Details = lazy(() => import("pages/Details/Details"));
const MyFurniture = lazy(() => import("pages/MyFurniture/MyFurniture"));
const ChangeUsername = lazy(() =>
  import("pages/ChangeUsername/ChangeUsername")
);
const Stats = lazy(() => import("pages/Stats/Stats"));

const ChangePassword = lazy(() =>
  import("pages/ChangePassword/ChangePassword")
);
const Cart = lazy(() => import("pages/Cart/Cart"));
const SearchedAll = lazy(() => import("pages/SearchedAll/SearchedAll"));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/furniture/all" component={All} />
      <ProtectedRoute
        exact
        path="/furniture/allSearched"
        component={SearchedAll}
      />
      <ProtectedRoute exact path="/furniture/create" component={Create} />
      <ProtectedRoute exact path="/furniture/edit/:id" component={Create} />
      <ProtectedRoute
        exact
        path="/furniture/my-furniture"
        component={MyFurniture}
      />
      <ProtectedRoute exact path="/furniture/details/:id" component={Details} />
      <ProtectedRoute
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
      <ProtectedRoute exact path="/stats" component={Stats} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
