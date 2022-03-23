import React from "react";
import styles from "./Layout.module.css";
import Header from "./Header/Header";
import { Grid, Snackbar, useTheme } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeNotificationModal } from "store/ui/uiActions";
const Layout = ({ children, modal, closeNotificationModal }) => {
  const { matchesSM } = useScreenSize();
  const theme = useTheme();
  return (
    <Grid container direction="column" className={styles["layout"]}>
      <Grid item className={styles["layout-children"]}>
        <Header />
        {children}
      </Grid>
      <Snackbar
        open={modal.showNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={closeNotificationModal}
        message={modal.message}
        style={{
          marginTop: matchesSM ? "70px" : "50px",
        }}
        ContentProps={{
          style: {
            background: theme.palette.common.darkerGrey,
          },
        }}
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeNotificationModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
