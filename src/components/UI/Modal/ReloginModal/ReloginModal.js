import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ModalButtons from "../ModalButtons/ModalButtons";
import {
  logoutUser,
  loginStarted,
  sendPWResetAction,
} from "store/auth/authActions";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";
import { Input } from "components/UI/Inputs/Inputs";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Error } from "components/UI/formError";
import { SubmitButton } from "components/UI/Buttons/Buttons";
const ReloginModal = ({
  closeModal,
  logoutUser,
  loginUser,
  sendPWResetAction,
}) => {
  const username = localStorage.getItem("username");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const email = localStorage.getItem("user_email");
  const logout = () => {
    logoutUser();
    closeModal();
  };

  useEffect(() => {
    const stay = localStorage.getItem("stay_signed_in");
    if (stay) {
      setStaySignedIn(JSON.parse(stay));
    }
  }, []);

  const loginHandler = () => {
    if (password.length === 0) {
      return setError("Please enter password!");
    } else if (password.length > 1 && password.length < 6) {
      return setError("Password should be at least 6 characters!");
    }
    setError("");
    const email = localStorage.getItem("user_email");
    loginUser({ email, password });
  };

  return (
    <>
      <WarningModalsContent
        text={
          isForgotPassword
            ? "Send reset link to email"
            : `${username} your session has expired `
        }
      />
      {!isForgotPassword ? (
        <>
          <Typography variant="subtitle2">
            Please enter your password to continue browsing!
          </Typography>
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
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={staySignedIn}
                    onChange={(e) => {
                      localStorage.setItem("stay_signed_in", e.target.checked);
                      setStaySignedIn(e.target.checked);
                    }}
                    color="primary"
                  />
                }
                label="Stay signed in"
              />
            </FormGroup>
            <Error error={error} />
          </Box>
        </>
      ) : (
        <Typography variant="subtitle2" gutterBottom>
          Email: {email}
        </Typography>
      )}
      {!isForgotPassword && (
        <Box>
          <Typography
            onClick={() => setIsForgotPassword(true)}
            variant="subtitle1"
            style={{ cursor: "pointer" }}
          >
            Forgot password?
          </Typography>
        </Box>
      )}
      {isForgotPassword ? (
        <Box>
          <SubmitButton onClick={() => sendPWResetAction()}>
            Send reset link to email
          </SubmitButton>
        </Box>
      ) : (
        <ModalButtons
          onSubmit={loginHandler}
          onClose={logout}
          submitButtonText="Login"
          cancelText="Logout"
        />
      )}
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
      sendPWResetAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReloginModal);
