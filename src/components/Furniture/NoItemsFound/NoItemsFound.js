import React from "react";
import { useNavigate } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { SubmitButton } from "components/UI/Buttons/Buttons";

const NoItemsFound = ({ text, subText, buttonText, location }) => {
  const navigate = useNavigate();
  const { matchesSM } = useScreenSize();
  const onClickHandler = () => {
    navigate(location);
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      style={{ marginTop: "10em" }}
    >
      <Grid item>
        <Typography variant="h4" gutterBottom>
          {text}
        </Typography>
      </Grid>
      <Grid
        item
        style={{ margin: "0 auto", maxWidth: matchesSM ? "90%" : "auto" }}
      >
        <Typography variant="subtitle1">{subText}</Typography>
      </Grid>
      <Grid item>
        <SubmitButton style={{ marginTop: "1em" }} onClick={onClickHandler}>
          {buttonText}
        </SubmitButton>
      </Grid>
    </Grid>
  );
};
export default NoItemsFound;
