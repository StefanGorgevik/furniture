import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import HomeContent from "components/HomeContent/HomeContent";

const HomePage = ({ isLoggedIn }) => {
  if (isLoggedIn) {
    return <Redirect to="/furniture/all" />;
  } else {
    return <HomeContent />;
  }
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.authReducer.isLoggedIn,
});

export default connect(mapStateToProps, null)(HomePage);
