import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
import { Grid, Typography, useMediaQuery, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import LandingHeader from "./LandingHeader";
import ChairTable from "assets/images/chairTable.png";
import NightStand from "assets/images/nightStand.png";
import Wardrobe from "assets/images/wardrobe.png";
import { connect } from "react-redux";
import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";

const HomeContent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAuth, setSelectedAuth] = useState("");
  const ref = useRef();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const selectAuthHandler = (type) => {
    setSelectedAuth(type);
    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "end",
      });
    }, 50);
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.homeContent}
      id="scrollingContainer"
    >
      <LandingHeader />
      <>
        {selectedAuth === "" && (
          <Grid
            item
            container
            direction="row"
            style={{ width: "95%", margin: "0 auto" }}
            //for animated height decrease
            // className={
            //   selectedAuth === "" ? classes.decreaseActive : classes.decrease
            // }
          >
            <Grid
              className={classes.homeContentItem}
              item
              container
              direction="column"
              justifyContent="space-between"
              md
            >
              <Grid item>
                <Typography
                  variant="h2"
                  style={{
                    width: matchesSM ? "12em" : undefined,
                    margin: "0 auto",
                  }}
                  align="center"
                >
                  Find the best furniture for your home!
                </Typography>
              </Grid>

              <Grid item>
                <img
                  alt="furniture logo"
                  src={ChairTable}
                  style={{ alignSelf: "center" }}
                />
              </Grid>
            </Grid>

            <Grid
              item
              container
              direction="column"
              justifyContent="space-between"
              className={classes.homeContentItem}
              md
            >
              <Grid item>
                <Typography variant="h2" align="center">
                  Review and like other furniture!
                </Typography>
              </Grid>

              <Grid item>
                <img
                  alt="NightStand"
                  src={NightStand}
                  style={{
                    alignSelf: "center",
                    marginTop: matchesSM ? "1em" : undefined,
                    height: "15em",
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              className={classes.homeContentItem}
              item
              container
              direction="column"
              justifyContent="space-between"
              md
            >
              <Grid item>
                <Typography variant="h2">Showcase your furniture!</Typography>
              </Grid>
              <Grid item container alignItems="center" direction="column">
                <img
                  alt="Wardrobe"
                  src={Wardrobe}
                  style={{
                    marginTop: "1em",
                    height: "15em",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </>
      <Grid item container direction="row" justifyContent="center">
        <Grid
          item
          container
          justifyContent="center"
          spacing={3}
          style={{ marginBottom: "2em", marginTop: "1em" }}
          //for animated decrease of marginTop
          // className={selectedAuth === "" ? classes.topPush : classes.topNoPush}
        >
          <Grid item>
            <Button
              variant={selectedAuth === "signIn" ? "contained" : "outlined"}
              color="primary"
              className={classes.homeButton}
              onClick={() => selectAuthHandler("signIn")}
              style={{ fontWeight: "bold" }}
            >
              Sign In
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={selectedAuth === "signUp" ? "contained" : "outlined"}
              color="primary"
              className={classes.homeButton}
              onClick={() => selectAuthHandler("signUp")}
              style={{ fontWeight: "bold" }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {selectedAuth === "signIn" && (
        <div ref={ref}>
          <Login />
        </div>
      )}
      {selectedAuth === "signUp" && (
        <div ref={ref}>
          <Register />
        </div>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

export default connect(mapStateToProps, null)(HomeContent);
