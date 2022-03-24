import React from "react";
import styles from "./Buttons.module.css";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  signInButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginBottom: "1em",
  },
  cancelButton: {
    width: "20em",
    color: "black",
    "&:hover": {
      background: "transparent",
    },
  },
}));

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={styles["back-button"]}>
      <ArrowBackIcon />
    </button>
  );
};

export const SubmitButton = ({ children, onClick, ...props }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick} className={classes.signInButton} {...props}>
      {children}
    </Button>
  );
};

export const SecondaryButton = ({ children, onClick, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      onClick={onClick}
      color="secondary"
      className={classes.cancelButton}
      {...props}
    >
      {children}
    </Button>
  );
};
