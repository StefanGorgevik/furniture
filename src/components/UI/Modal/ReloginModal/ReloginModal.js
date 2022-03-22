import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ModalButtons from "../ModalButtons/ModalButtons";
import { logoutUser, loginStarted } from "store/auth/authActions";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";
import { Input } from "components/UI/Inputs/Inputs";
import { Box } from "@material-ui/core";
import { Error } from "components/UI/formError";
const ReloginModal = ({ closeModal, logoutUser, loginUser }) => {
  const username = localStorage.getItem("username");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const logout = () => {
    logoutUser();
    closeModal();
  };

  const loginHandler = () => {
    if (password.length === 0) {
      return setError("Please enter password!");
    } else if (password.length < 6) {
      return setError("Password should be at least 6 characters!");
    }
    const email = localStorage.getItem("user_email");
    loginUser({ email, password });
  };

  return (
    <>
      <WarningModalsContent text={`${username} your session has expired `} />
      <Box style={{ width: "90%", margin: "0 auto" }}>
        <Input
          label="Password"
          type="password"
          id="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.includes("password")}
          setError={setError}
        />
        <Error error={error} />
      </Box>
      <ModalButtons
        onSubmit={loginHandler}
        onClose={logout}
        submitButtonText="Login"
        cancelText="Logout"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  modalData: state.uiReducer.modalData,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal,
      logoutUser,
      loginUser: loginStarted,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReloginModal);
