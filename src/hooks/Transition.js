import React from "react";
import CSSTransition from "react-transition-group/CSSTransition";

import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  animationStart: {
    display: "none",
  },
  animationEnter: {
    display: "none",
  },
  animationDone: {
    display: "block",
  },
  mainTitle: {
    textTransform: "uppercase",
    fontFamily: "Paytone One",
    animation: `$slide 2s ${theme.transitions.easing.easeIn} forwards`,
  },
  lampOn: {
    width: "4em",
    marginTop: "-0.4em",
    marginBottom: "1em",
    zIndex: 10,
    animation: `$slide 1s ${theme.transitions.easing.easeIn} forwards`,
  },
  "@keyframes slide": {
    "0%": {
      opacity: "0",
    },
    "100%": {
      opacity: 1,
    },
  },
}));

const Transition = ({ children, timeout, onOpen }) => {
  const classes = useStyles();

  return (
    <CSSTransition
      mountOnEnter
      in={onOpen}
      timeout={timeout}
      classNames={{
        enter: classes.animationEnter,
        enterActive: classes.animationStart,
        exitActive: classes.animationDone,
      }}
    >
      {children}
    </CSSTransition>
  );
};

export default Transition;
