import React, { useState } from "react";
import useStyles from "./styles";
import { Input } from "components/UI/Inputs/Inputs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerStarted } from "store/auth/authActions";
import { validateRegisterForm } from "utils/validators";
import { Grid, Button } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";

const Register = ({ registerUser }) => {
  const classes = useStyles();
  const { matchesMD } = useScreenSize();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState({
    username: false,
    email: false,
    password: false,
    secondPassword: false,
    repeatPassword: false,
  });

  const registerHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();
      setError({
        username: false,
        email: false,
        password: false,
        secondPassword: false,
        repeatPassword: false,
      });

      const userInput = {
        username,
        email,
        password,
        repeatPassword,
      };

      const valData = validateRegisterForm(userInput);
      setError(valData.allErrors);

      if (valData.errorCount > 0) return;

      registerUser({
        email,
        username,
        password,
      });
    }
  };

  return (
    <Grid item container direction="column">
      <form
        className={classes.formWrapper}
        onKeyPress={(e) => registerHandler(e, true)}
        style={{
          width: matchesMD ? "90%" : "30%",
          maxWidth: matchesMD ? "90%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Input
          label="Username"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={error.username.length > 0}
          helperText={error.username}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.email.length > 0}
          helperText={error.email}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.password.length > 0}
          helperText={error.password}
        />
        <Input
          label="Repeat password"
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          error={error.repeatPassword.length > 0 || error.secondPassword}
          helperText={error.secondPassword}
        />
        <Grid item container direction="column">
          <Grid item>
            <Button
              onClick={(e) => registerHandler(e, false)}
              className={classes.registerButton}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      registerUser: registerStarted,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
