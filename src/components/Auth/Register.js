import React, { useState } from "react";
import { Input } from "components/UI/Inputs/Inputs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { registerStarted } from "store/auth/authActions";
import { validateRegisterForm } from "utils/validators";
import { Grid, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { Error } from "components/UI/formError";
import { SubmitButton } from "components/UI/Buttons/Buttons";

const Register = ({ registerUser }) => {
  const { matchesSM } = useScreenSize();
  const [email, setEmail] = useState("");
  const [staySignedIn, setStaySignedIn] = useState(false);
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
      localStorage.setItem("stay_signed_in", staySignedIn);
      registerUser({
        email,
        username,
        password,
      });
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
        onKeyPress={(e) => registerHandler(e, true)}
        style={{
          width: matchesSM ? "90%" : "30%",
          maxWidth: matchesSM ? "90%" : "30%",
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
          setError={setError}
        />
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
          id="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error.includes("password")}
          setError={setError}
        />
        <Input
          label="Repeat password"
          type="password"
          id="repeat-password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          error={error.includes("don't match")}
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
            <SubmitButton onClick={(e) => registerHandler(e, false)}>
              Sign Up
            </SubmitButton>
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
