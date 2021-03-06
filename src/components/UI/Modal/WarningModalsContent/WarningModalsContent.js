import WarningIcon from "@material-ui/icons/Warning";
import { Grid, Typography } from "@material-ui/core";

const WarningModalsContent = ({ text }) => {
  return (
    <Grid
      item
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ paddingTop: "1em" }}
    >
      <Grid item>
        <WarningIcon fontSize="large" color="primary" />
      </Grid>
      <Grid item style={{ padding: "2em" }}>
        <Typography
          variant="h5"
          color="primary"
          style={{ fontSize: "1.75rem" }}
        >
          {text.charAt(0).toUpperCase() + text.slice(1)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default WarningModalsContent;
