import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginStarted } from "store/auth/authActions";

import { validateLoginForm } from "utils/validators";
import { Input } from "components/UI/Inputs/Inputs";
import {
  Grid,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import useStyles from "./styles";
import { useScreenSize } from "hooks/breakpoints";
import { Error } from "components/UI/formError";

const Login = ({ loginUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState("");
  const { matchesSM } = useScreenSize();

  const loginHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();
      const valData = validateLoginForm({ email, password });
      setError(valData);
      if (valData !== "") return;
      setError("");
      localStorage.setItem("stay_signed_in", staySignedIn);
      loginUser({ email, password });
    }
  };
  return (
    <Grid
      item
      container
      direction="column"
      style={{ marginBottom: matchesSM ? "2em" : 0 }}
    >
      <form
        className={classes.formWrapper}
        onKeyPress={(e) => loginHandler(e, true)}
        style={{
          width: matchesSM ? "80%" : "30%",
          maxWidth: matchesSM ? "80%" : "30%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "0 auto",
        }}
      >
        <Input
          label="Email"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error.includes("email")}
          setError={setError}
        />
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
                  setStaySignedIn(e.target.checked);
                }}
                color="primary"
              />
            }
            label="Stay signed in"
          />
        </FormGroup>
        <Error error={error} />
        <Grid item container direction="column">
          <Grid item>
            <Button
              onClick={(e) => loginHandler(e, false)}
              className={classes.signInButton}
            >
              Sign In
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
      loginUser: loginStarted,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
