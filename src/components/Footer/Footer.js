import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    background: `linear-gradient(to right, ${theme.palette.common.grey} 10%, ${theme.palette.common.darkerGrey} 90%)`,
    display: "flex",
    justifyContent: "flex-end",
    color: "white",
    padding: "2%",
    paddingTop: "0.3em",
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "30px",
    },
  },
}));
const Footer = ({ position }) => {
  const classes = useStyles();
  return (
    <footer className={classes.footer} style={{ position: position }}>
      <p>Copyright 2021 Stefan Gorgevik for Musala Soft</p>
    </footer>
  );
};
export default Footer;
