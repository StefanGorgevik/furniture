import React, { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import { useLocation } from "react-router";
import Header from "components/Header/Header";
import { BackButton } from "components/UI/Buttons/Buttons";
import Footer from "components/Footer/Footer";
import { Grid } from "@material-ui/core";

const Layout = (props) => {
  const [canScroll, setCanScroll] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/") {
      setTimeout(() => {
        console.log("SETTING");
        setCanScroll(true);
      }, 1700);
    }
  }, [pathname]);

  const showBackButton =
    pathname === "/furniture/create" ||
    pathname.startsWith("/furniture/details/") ||
    pathname === "/profile" ||
    pathname === "/furniture/create" ||
    pathname.startsWith("/furniture/edit/") ||
    pathname === "/profile/change-password" ||
    pathname === "/cart" ||
    pathname === "/stats";

  const showFooter = pathname !== "/";

  return (
    <Grid container direction="column" className={styles["layout"]}>
      <Grid
        item
        className={
          canScroll ? styles["layout-children"] : styles["layout-cantScroll"]
        }
      >
        <Header />

        {showBackButton && (
          <div className={styles["back-btn-div"]}>
            <BackButton />{" "}
          </div>
        )}

        {props.children}
        {showFooter && <Footer />}
      </Grid>
    </Grid>
  );
};

export default Layout;
