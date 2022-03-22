import React from "react";
import { Grid, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  acceptActionButton: {
    ...theme.typography.acceptButton,
    width: "100%",
    margin: "0 10px",
  },
  cancelButton: {
    color: "black",
    width: "100%",
    "&:hover": {
      background: "transparent",
    },
  },
}));

const ModalButtons = ({ onSubmit, onClose, submitButtonText, cancelText }) => {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="row"
      justify="space-evenly"
      style={{ marginTop: "1em", marginBottom: "1em" }}
    >
      <Grid item>
        <Button
          onClick={onClose}
          className={classes.cancelButton}
          color="secondary"
        >
          {cancelText ? cancelText : "Cancel"}
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={onSubmit} className={classes.acceptActionButton}>
          {submitButtonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ModalButtons;
