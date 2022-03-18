import { Route, Redirect } from "react-router";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, auth, path, exact }) => {
  const isLoggedIn = localStorage.getItem("is_logged_in") === "1";

  return (
    <>
      {isLoggedIn ? (
        <Route exact={exact} path={path} key={path} component={Component} />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};

export default connect(mapStateToProps)(ProtectedRoute);
