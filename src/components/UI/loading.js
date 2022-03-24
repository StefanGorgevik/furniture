import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

export const Loading = () => (
  <Grid container style={{ minHeight: "100vh", justifyContent: "center" }}>
    <Grid item style={{ paddingTop: "5em" }}>
      <CircularProgress />
    </Grid>
  </Grid>
);
