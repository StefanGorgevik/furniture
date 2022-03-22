import React from "react";
import styles from "./Layout.module.css";
import Header from "./Header/Header";
import { Grid } from "@material-ui/core";

const Layout = (props) => {
  return (
    <Grid container direction="column" className={styles["layout"]}>
      <Grid item className={styles["layout-children"]}>
        <Header />
        {props.children}
      </Grid>
    </Grid>
  );
};

export default Layout;
