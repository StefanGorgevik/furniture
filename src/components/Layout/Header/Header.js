import React, { useState, useEffect, useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Menu,
  Box,
  Typography,
} from "@material-ui/core";
import { openModal } from "store/ui/uiActions";
import useStyles from "./styles.js";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ElevationScroll } from "./ElevationScroll";
import CreateIcon from "@material-ui/icons/Create";
import WebIcon from "@material-ui/icons/Web";
import SearchIcon from "@material-ui/icons/Search";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useScreenSize } from "hooks/breakpoints";
import { BackButton } from "components/UI/Buttons/Buttons";
import styles from "../Layout.module.css";

const Header = ({ isLoggedIn, openModal }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = useLocation().pathname;
  const [tab, setHeaderTab] = useState(0);
  const { matchesMD } = useScreenSize();
  useEffect(() => {
    if (pathname === "/furniture/all") {
      setHeaderTab(0);
    } else if (pathname === "/furniture/search") {
      setHeaderTab(1);
    } else if (pathname === "/furniture/create") {
      setHeaderTab(2);
    } else if (pathname === "/furniture/my-furniture") {
      setHeaderTab(3);
    }
  }, [pathname]);

  const handleChange = (e, newValue) => {
    if (newValue === 4) return;
    setHeaderTab(newValue);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const loggedInTabs = useMemo(
    () => [
      {
        name: "Browse",
        to: "/furniture/all",
        icon: <WebIcon style={{ marginRight: "0.2em", marginTop: "0.2em" }} />,
      },
      {
        name: "Search",
        to: "/furniture/search",
        icon: (
          <SearchIcon style={{ marginRight: "0.2em", marginTop: "0.2em" }} />
        ),
      },
      {
        name: "Create",
        to: "/furniture/create",
        icon: (
          <CreateIcon style={{ marginRight: "0.2em", marginTop: "0.2em" }} />
        ),
      },
      {
        name: "My Furniture",
        to: "/furniture/my-furniture",
        icon: (
          <ListAltIcon style={{ marginRight: "0.2em", marginTop: "0.2em" }} />
        ),
      },
      {
        name: "Logout",
        to: pathname,
        icon: (
          <ExitToAppIcon style={{ marginRight: "0.2em", marginTop: "0.2em" }} />
        ),
      },
    ],
    [pathname]
  );

  const tabs = isLoggedIn
    ? loggedInTabs.map((tab, i) => (
        <Tab
          onClick={() => {
            if (tab.name === "Logout") {
              openModal("logout");
            }
            handleClose();
          }}
          key={`${tab.name}${i}`}
          className={classes.tab}
          label={tab.name}
          component={NavLink}
          to={tab.to}
          icon={tab.icon}
        />
      ))
    : null;

  const showBackButton =
    pathname === "/furniture/create" ||
    pathname.startsWith("/furniture/details/") ||
    pathname === "/profile" ||
    pathname === "/furniture/create" ||
    pathname.startsWith("/furniture/edit/") ||
    pathname === "/profile/change-password" ||
    pathname === "/cart" ||
    pathname === "/stats";

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters className={classes.headerWrapper}>
            {showBackButton ? (
              <div className={styles["back-btn-div"]}>
                <BackButton />
              </div>
            ) : (
              <Typography style={{ paddingLeft: "10px" }} variant="h1">
                Furnlab
              </Typography>
            )}

            {!matchesMD ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  width: matchesMD ? "100%" : "90%",
                }}
              >
                <Tabs
                  value={tab}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  className={classes.tabs}
                >
                  {tabs}
                </Tabs>
              </Box>
            ) : (
              <Box>
                {isLoggedIn && (
                  <Tab
                    disableRipple
                    icon={<MoreVertIcon />}
                    onClick={(event) => handleClick(event)}
                  />
                )}
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  classes={{ paper: classes.menu }}
                  MenuListProps={{
                    onMouseLeave: handleClose,
                  }}
                  elevation={0}
                  style={{ zIndex: 1302 }}
                  keepMounted
                >
                  {tabs}
                </Menu>
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
  isLoggedIn: state.authReducer.isLoggedIn,
  tab: state.uiReducer.headerTab,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
