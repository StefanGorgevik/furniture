import React, { useState, useEffect, useRef } from "react";
import useStyles from "./styles";
import { Grid, Typography, useMediaQuery, Button } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import LandingHeader from "./LandingHeader";
import ChairTable from "assets/images/chairTable.png";
import NightStand from "assets/images/nightStand.png";
import Wardrobe from "assets/images/wardrobe.png";
import Transition from "hooks/Transition";
import { connect } from "react-redux";
import Login from "components/Auth/Login/Login";
import Register from "components/Auth/Register/Register";
import Footer from "components/Footer/Footer";

const HomeContent = () => {
  const classes = useStyles();
  const [isTextOn, setIsTextOn] = useState(false);
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedAuth, setSelectedAuth] = useState("");
  const [isLampOn, setIsLampOn] = useState(false);
  const ref = useRef();

  function enable() {}

  function disable() {}

  useEffect(() => {
    enable();
    setTimeout(() => {
      setIsLampOn(true);
    }, 800);

    setTimeout(() => {
      setIsTextOn(true);
      // enable();
    }, 1500);
  }, []);

  const selectAuthHandler = (type) => {
    setSelectedAuth(type);
    setTimeout(() => {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "end",
      });
    }, 200);
  };

  return (
    <Grid
      container
      direction="column"
      className={classes.homeContent}
      id="scrollingContainer"
    >
      <LandingHeader isLampOn={isLampOn} />

      <Transition onOpen={isLampOn} timeout={1100}>
        <>
          <Grid
            item
            container
            direction="row"
            style={{ width: "95%", margin: "0 auto" }}
          >
            <Grid
              className={classes.homeContentItem}
              item
              container
              direction="column"
              justify="space-between"
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
                  className={classes.animationContent}
                >
                  Find the best fit of furniture for your home!
                </Typography>
              </Grid>

              <Grid item>
                <img
                  alt="furniture logo"
                  src={ChairTable}
                  style={{ alignSelf: "center", marginTop: "1em" }}
                  className={classes.animationContent}
                />
              </Grid>
            </Grid>

            <Grid
              className={classes.homeContentItem}
              item
              container
              direction="column"
              justify="space-between"
              md
            >
              <Grid item style={{ marginTop: !matchesSM ? 100 : undefined }}>
                <Typography
                  variant="h2"
                  align="center"
                  className={classes.animationContent}
                >
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
                    marginBottom: !matchesSM ? -100 : undefined,
                  }}
                  className={classes.animationContent}
                />
              </Grid>
            </Grid>

            <Grid
              className={classes.homeContentItem}
              item
              container
              direction="column"
              justify="space-between"
              md
            >
              <Grid item>
                <Typography variant="h2" className={classes.animationContent}>
                  Post and sell your furniture!
                </Typography>
              </Grid>
              <Grid item container alignItems="center" direction="column">
                <img
                  alt="Wardrobe"
                  src={Wardrobe}
                  style={{
                    marginTop: "1em",
                    height: "15em",
                  }}
                  className={classes.animationContent}
                />
              </Grid>
            </Grid>
          </Grid>
        </>
      </Transition>
      <Transition onOpen={isTextOn} timeout={1100}>
        <Grid item container direction="row" justify="center">
          <Grid item xl style={{ marginTop: "10em" }}>
            <Typography variant="h4">How do you want to proceed?</Typography>
          </Grid>
          <Grid
            item
            container
            justify="center"
            spacing={3}
            style={{ marginBottom: "5em" }}
          >
            <Grid item>
              <Button
                variant={selectedAuth === "signIn" ? "contained" : "outlined"}
                lg
                color="primary"
                className={classes.homeButton}
                onClick={() => selectAuthHandler("signIn")}
              >
                Sign In
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={selectedAuth === "signUp" ? "contained" : "outlined"}
                lg
                color="primary"
                className={classes.homeButton}
                onClick={() => selectAuthHandler("signUp")}
              >
                Sign Up
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Transition>

      {selectedAuth === "signIn" && isTextOn && (
        <div ref={ref}>
          <Login />
        </div>
      )}
      {selectedAuth === "signUp" && (
        <div ref={ref}>
          <Register />
        </div>
      )}
      <Transition onOpen={isTextOn} timeout={1100}>
        <Footer position="relative" />
      </Transition>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

export default connect(mapStateToProps, null)(HomeContent);
