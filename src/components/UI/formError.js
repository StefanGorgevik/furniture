import React from "react";
import WarningIcon from "@material-ui/icons/Warning";
import { Grid, Typography } from "@material-ui/core";
export const Error = ({ error }) => (
  <Grid
    item
    container
    style={{
      height: 40,
      paddingBottom: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {error !== "" && (
      <Grid item>
        <WarningIcon color="error" />
      </Grid>
    )}
    {error !== "" && (
      <Grid item>
        <Typography color="error" gutterBottom variant="caption">
          {error}
        </Typography>
      </Grid>
    )}
  </Grid>
);
