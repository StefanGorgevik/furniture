import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openModal } from "store/ui/uiActions";
import { refreshTokenAction } from "store/auth/authActions";

const ProtectedRoute = ({ children, openModal, refreshTokenAction }) => {
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("is_logged_in") === "1";
  useEffect(() => {
    const tryLogin = async () => {
      const userToken = localStorage.getItem("user_token");
      if (!userToken) {
        return;
      }
      const date = localStorage.getItem("expiresDate");
      if (date) {
        const newDate = new Date(JSON.parse(date));
        if (newDate > new Date() || !userToken) {
          return;
        } else {
          const stay = localStorage.getItem("stay_signed_in");
          if (JSON.parse(stay)) {
            const refresh_token = localStorage.getItem("refresh_token");
            if (refresh_token) {
              refreshTokenAction();
            }
          } else {
            openModal("relogin");
          }
        }
      }
    };

    tryLogin();
  }, [openModal, refreshTokenAction]);
  if (!isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
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
