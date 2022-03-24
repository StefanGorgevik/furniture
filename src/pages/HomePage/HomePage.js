import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router";
import HomeContent from "components/HomeContent/HomeContent";

const HomePage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Navigate to="/furniture/all" />;
  } else {
    return <HomeContent />;
  }
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps, null)(HomePage);
