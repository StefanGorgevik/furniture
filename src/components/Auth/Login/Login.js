import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginStarted } from "store/auth/authActions";

import { validateLoginForm } from "utils/validators";
import { Input } from "components/UI/Inputs/Inputs";
import { Grid, Button } from "@material-ui/core";
import useStyles from "./styles";

const Login = ({ loginUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const loginHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();
      const valData = validateLoginForm({ email, password });
      setError(valData.allErrors);
      if (valData.errorCount > 0) return;
      loginUser({ email, password });
    }
  };

  return (
    <Grid item container direction="column" style={{ marginBottom: "5em" }}>
      <Grid item container direction="column">
        <form onKeyPress={(e) => loginHandler(e, true)}>
          <Grid item>
            <Input
              label="Email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error.email}
              helperText={error.email}
            />
          </Grid>
          <Grid item>
            <Input
              label="Password"
              type="password"
              id="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error.password}
              helperText={error.password}
            />
          </Grid>
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
