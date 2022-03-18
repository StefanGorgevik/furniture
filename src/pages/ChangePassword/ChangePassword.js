import React, { useState } from "react";
import useStyles from "./styles";
import { saveNewPasswordAction } from "store/auth/authActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input } from "components/UI/Inputs/Inputs";
import { validateChangePWForm } from "utils/validators";
import { Grid, Typography, Button } from "@material-ui/core";

const ChangePassword = ({ saveNewPasswordAction }) => {
  const classes = useStyles();
  const email = localStorage.getItem("user_email");
  const [userInput, setUserInput] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const saveValue = (e, id) => {
    setUserInput((prevState) => {
      return { ...prevState, [id]: e.target.value };
    });
  };

  const saveNewPasswordHandler = () => {
    const valData = validateChangePWForm(userInput);
    setErrors(valData.allErrors);

    if (valData.errorCount > 0) return;

    let data = {
      userData: userInput,
      email,
    };
    saveNewPasswordAction(data);
  };

  return (
    <Grid
      container
      direction="column"
      style={{ marginTop: "5em", marginBottom: "5em" }}
    >
      <Grid item>
        <Typography variant="h3" style={{ textTransform: "uppercase" }}>
          Change password
        </Typography>
      </Grid>
      <Grid item>
        <Input
          label="Type current password"
          type="password"
          id="currentPassword"
          value={userInput.currentPassword}
          onChange={(e) => saveValue(e, "currentPassword")}
          error={errors.currentPassword.length > 9}
          helperText={errors.currentPassword}
        />
      </Grid>

      <Grid item>
        <Input
          label="Type new password"
          type="password"
          id="newPassword"
          value={userInput.newPassword}
          onChange={(e) => saveValue(e, "newPassword")}
          error={errors.newPassword.length > 9}
          helperText={errors.newPassword}
        />
      </Grid>

      <Grid item>
        <Input
          label="Repeat new password"
          type="password"
          id="repeatPassword"
          value={userInput.repeatPassword}
          onChange={(e) => saveValue(e, "repeatPassword")}
          error={errors.repeatPassword.length > 9}
          helperText={errors.repeatPassword}
        />
      </Grid>

      <Grid item>
        <Button onClick={saveNewPasswordHandler} className={classes.saveButton}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.authReducer.userInfo,
  isUserInfoLoaded: state.authReducer.isUserInfoLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveNewPasswordAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
