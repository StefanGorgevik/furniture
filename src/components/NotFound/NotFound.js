import { Grid, Typography } from "@material-ui/core";
import React from "react";

const NotFound = () => {
  return (
    <Grid container justifyContent="center" style={{ marginTop: 300 }}>
      <Typography variant="h1">Page not found!</Typography>
    </Grid>
  );
};

export default NotFound;
