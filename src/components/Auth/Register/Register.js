import React, { useState } from "react";
import useStyles from "./styles";
import { Input } from "components/UI/Inputs/Inputs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerStarted } from "store/auth/authActions";
import { validateRegisterForm } from "utils/validators";
import { Grid, Button } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { Error } from "components/UI/formError";

const Register = ({ registerUser }) => {
  const classes = useStyles();
  const { matchesMD } = useScreenSize();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();

      const valData = validateRegisterForm({
        username,
        email,
        password,
        repeatPassword,
      });
      setError(valData);

      if (valData !== "") return;
      else {
        setError("");
      }
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
          error={error.includes("username")}
        />
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.includes("email")}
        />
        <Input
          label="Password"
          type="password"
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.includes("password")}
        />
        <Input
          label="Repeat password"
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          error={error.includes("don't match")}
        />
        <Error error={error} />
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
