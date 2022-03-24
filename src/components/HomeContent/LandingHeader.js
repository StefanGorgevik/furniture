import React from "react";
import useStyles from "./styles";
import { Grid, useMediaQuery, useTheme } from "@material-ui/core";

import Transition from "hooks/Transition";

import closet from "assets/images/landingHeader/closet.png";
import lampHolder from "assets/images/landingHeader/lampHolder.png";
import lampOn from "assets/images/landingHeader/lampOn.png";
import sofa from "assets/images/landingHeader/sofa.png";
import chair from "assets/images/landingHeader/chair.png";

const LandingHeader = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      item
      container
      className={classes.landingHeader}
      direction="column"
      justifyContent="space-between"
    >
      <Grid item container direction="column" alignItems="center">
        <img
          src={lampHolder}
          alt="lamp holder"
          style={{
            width: "4em",
            zIndex: 20,
          }}
        />
        <img src={lampOn} alt="lamp light" className={classes.lampOn} />
      </Grid>
      <Transition onOpen={true} timeout={50}>
        <Grid
          item
          container
          direction="row"
          className={classes.landingItemsWrapper}
          justifyContent="center"
          alignItems="flex-end"
          spacing={3}
        >
          <Grid item>
            <img
              src={sofa}
              alt="sofa"
              style={{ width: "5em", height: "5em" }}
            />
          </Grid>
          <Grid item>
            <img
              src={chair}
              alt="sofa"
              style={{
                width: "5em",
                height: "5em",
                position: "relative",
                top: matchesSM ? 0 : "2em",
                margin: "0 2em",
              }}
            />
          </Grid>
          <Grid item>
            <img
              src={closet}
              alt="nice closet"
              style={{ width: "5em", height: "5em" }}
            />
          </Grid>
        </Grid>
      </Transition>
    </Grid>
  );
};

export default LandingHeader;
