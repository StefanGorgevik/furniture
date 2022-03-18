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

const ModalButtons = ({ onSubmit, onClose, submitButtonText }) => {
  const classes = useStyles();

  return (
    <Grid item container direction="row" style={{ marginTop: "1em" }}>
      <Grid item lg>
        <Button
          onClick={onClose}
          text="Cancel"
          className={classes.cancelButton}
          color="secondary"
        >
          Cancel
        </Button>
      </Grid>
      <Grid item lg>
        <Button onClick={onSubmit} className={classes.acceptActionButton}>
          {submitButtonText}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ModalButtons;
