import React, { useState, useEffect, useMemo } from "react";
import { useLocation, NavLink, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  Grid,
  IconButton,
} from "@material-ui/core";
import { logoutUser } from "store/auth/authActions";
import { openModal } from "store/ui/uiActions";
import Logo from "assets/images/Logo.png";
import useStyles from "./styles.js";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ElevationScroll } from "./ElevationScroll";
import EditIcon from "@material-ui/icons/Edit";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import CreateIcon from "@material-ui/icons/Create";
import WebIcon from "@material-ui/icons/Web";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SearchInput from "components/UI/Inputs/SearchInput";

const Header = ({ isLoggedIn, openModal }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const pathname = useLocation().pathname;
  const [tab, setHeaderTab] = useState(1);

  useEffect(() => {
    if (pathname === "/furniture/all") {
      setHeaderTab(0);
    } else if (pathname === "/furniture/create") {
      setHeaderTab(1);
    } else if (pathname === "/furniture/my-furniture") {
      setHeaderTab(2);
    }
  }, [pathname]);

  const handleChange = (e, newValue) => {
    setHeaderTab(newValue);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
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
    ],
    []
  );

  const tabs = isLoggedIn
    ? loggedInTabs.map((tab, i) => (
        <Tab
          key={`${tab.name}${i}`}
          className={classes.tab}
          label={tab.name}
          component={NavLink}
          to={tab.to}
          icon={tab.icon}
        />
      ))
    : null;

  const menuOptions = useMemo(() => {
    return [
      {
        name: "Cart",
        link: "/cart",
        activeIndex: 1,
        selectedIndex: 0,
        icon: <ShoppingCartIcon />,
        onClick: () => {},
      },
      {
        name: "Stats",
        link: "/stats",
        activeIndex: 1,
        selectedIndex: 0,
        icon: <EqualizerIcon />,
        onClick: () => {},
      },
      {
        name: "Change Username",
        link: "/change-username",
        activeIndex: 1,
        selectedIndex: 0,
        icon: <EditIcon fontSize="small" />,
        onClick: () => {},
      },
      {
        name: "Change Password",
        link: "/change-password",
        activeIndex: 1,
        selectedIndex: 0,
        icon: <EditIcon fontSize="small" />,
        onClick: () => {},
      },
      {
        name: "Logout",
        link: undefined,
        activeIndex: 1,
        selectedIndex: 2,
        icon: <ExitToAppIcon fontSize="small" />,
        onClick: () => openModal("logout"),
      },
    ];
  }, [openModal]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar disableGutters className={classes.headerWrapper}>
            <img src={Logo} alt="logo" className={classes.logo} />
            <>
              <Tabs
                value={tab}
                onChange={handleChange}
                indicatorColor="primary"
                className={classes.tabs}
              >
                {pathname !== "/" && (
                  <Grid
                    item
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <SearchInput />
                  </Grid>
                )}

                {tabs}
                {isLoggedIn && (
                  <Tab
                    icon={<SettingsIcon />}
                    onMouseOver={(event) => handleClick(event)}
                  />
                )}
              </Tabs>
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
                {menuOptions.map((option, i) => (
                  <MenuItem
                    key={`${option}${i}`}
                    component={Link}
                    to={option.link ? option.link : "/"}
                    classes={{ root: classes.menuItem }}
                    onClick={(event) => {
                      option.onClick();
                      handleMenuItemClick(event, i);
                    }}
                    selected={i === selectedIndex && tab === 1}
                    style={{
                      borderBottom: i === 1 ? "1px solid white" : "",
                    }}
                  >
                    <ListItemIcon
                      style={{
                        color: "white",
                        marginRight: "auto",
                      }}
                    >
                      {option.icon}
                    </ListItemIcon>
                    <Typography variant="caption">{option.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
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
      logoutUser,
      openModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
