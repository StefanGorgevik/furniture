import React from "react";
import { useHistory } from "react-router";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  createButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginTop: "2em",
  },
}));

const NoItemsFound = ({ text, subText, buttonText, location }) => {
  const history = useHistory();
  const classes = useStyles();
  const onClickHandler = () => {
    history.push(location);
  };
  return (
    <Grid
      container
      direction="column"
      justify="center"
      style={{ paddingTop: "5em" }}
    >
      <Grid item>
        <Typography variant="h4">{text}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h5">{subText}</Typography>
      </Grid>
      <Grid item>
        <Button onClick={onClickHandler} className={classes.createButton}>
          {buttonText}
        </Button>
      </Grid>
    </Grid>
  );
};
export default NoItemsFound;
