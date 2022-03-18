import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  detailsImageContainer: {
    width: "40em",
    padding: "1%",
  },
}));

const DetailsImage = ({ imageURL }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      className={classes.detailsImageContainer}
      direction="column"
      alignItems="flex-end"
      justify="center"
    >
      <img
        src={imageURL}
        alt="furniture"
        style={{ maxHeight: "50em", width: "90%" }}
      />
    </Grid>
  );
};

export default DetailsImage;
