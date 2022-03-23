import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Input } from "components/UI/Inputs/Inputs";
import { Grid, Typography, Button } from "@material-ui/core";
import {
  getUserInfoAction,
  saveEditedInfoAction,
} from "store/auth/authActions";

const ChangeUsername = ({
  getUserInfoAction,
  userInfo,
  isUserInfoLoaded,
  saveEditedInfoAction,
}) => {
  const classes = useStyles();
  const userEmail = localStorage.getItem("user_email");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isUserInfoLoaded) {
      getUserInfoAction(userEmail);
    }

    if (isUserInfoLoaded) {
      setUserName(userInfo.username);
    }
  }, [userEmail, isUserInfoLoaded, getUserInfoAction, userInfo]);

  const saveEditHandler = () => {
    if (userName.trim().length === 0) return setError(true);
    setError(false);
    saveEditedInfoAction({ username: userName, email: userEmail });
  };

  return (
    <Grid
      container
      direction="column"
      style={{ marginTop: "5em", marginBottom: "5em" }}
    >
      <Grid item>
        <Typography variant="h3" style={{ textTransform: "uppercase" }}>
          Change username
        </Typography>
      </Grid>
      <Grid item className={classes.row}>
        <Input
          label="Username"
          type="text"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={error}
          helperText={error && "Enter your username"}
        />
      </Grid>
      <Grid item>
        <Button onClick={saveEditHandler} className={classes.saveButton}>
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
      getUserInfoAction,
      saveEditedInfoAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ChangeUsername);
