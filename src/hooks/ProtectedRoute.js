import React, { useEffect } from "react";
import { Route, Redirect } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { openModal } from "store/ui/uiActions";

const ProtectedRoute = ({
  component: Component,
  auth,
  path,
  exact,
  openModal,
}) => {
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
          openModal("relogin");
        }
      }
    };

    tryLogin();
  }, [openModal]);
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
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
