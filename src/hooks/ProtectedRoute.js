import { Route } from "react-router";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  auth,
  path,
  exact,
  openModal,
  refreshTokenAction,
}) => {
  const isLoggedIn = localStorage.getItem("is_logged_in") === "1";
  const location = useLocation();

    tryLogin();
  }, [openModal, refreshTokenAction]);
  return (
    <>
      {isLoggedIn ? (
        <Route exact={exact} path={path} key={path} component={Component} />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
      refreshTokenAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
