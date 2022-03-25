import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendPWResetAction } from "store/auth/authActions";

import { Input } from "components/UI/Inputs/Inputs";
import { Grid } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { Error } from "components/UI/formError";
import { SubmitButton } from "components/UI/Buttons/Buttons";

const ForgotPassword = ({ sendPWResetAction }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { matchesSM } = useScreenSize();

  const resetPwHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();
      if (email.length === 0 || email === "" || !email.trim().includes("@")) {
        setError("Please enter a correct email!");
        return;
      } else {
        setError("");
        sendPWResetAction({ email });
      }
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
        onKeyPress={(e) => resetPwHandler(e, true)}
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

        <Error error={error} />
        <Grid item container direction="column">
          <Grid item>
            <SubmitButton onClick={(e) => resetPwHandler(e, false)}>
              Send reset link to email
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
      sendPWResetAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
