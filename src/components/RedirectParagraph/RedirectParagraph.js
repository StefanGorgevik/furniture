import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import {
  changeHomeContentAction,
  setHeaderTabAction,
} from "store/ui/uiActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const useStyles = makeStyles((theme) => ({
  link: {
    "&:hover": {
      textDecoration: "underline",
      backgroundColor: theme.palette.darkerGrey,
    },
    cursor: "pointer",
    lineHeight: "2em",
  },
}));

const RedirectParagraph = ({ redirect, setTab, text, to }) => {
  const classes = useStyles();
  return (
    <Grid item style={{ marginTop: "1em", marginBottom: "1em" }}>
      <Typography variant="caption">
        {text}
        <span
          className={classes.link}
          onClick={() => {
            redirect(to);
            setTab(to);
          }}
        >
          here.
        </span>
      </Typography>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      redirect: changeHomeContentAction,
      setTab: setHeaderTabAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RedirectParagraph);
