import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    minHeight: "70px",
    background: `linear-gradient(to right, ${theme.palette.common.grey} 10%, ${theme.palette.common.darkerGrey} 90%)`,
    justifyContent: "space-between",
  },

  tabs: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    "& .MuiTab-wrapper": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("lg")]: {
        flexDirection: "row",
        justifyContent: "flex-start",
        minWidth: "150px",
        width: "170px",
      },
      [theme.breakpoints.up("lg")]: {
        justifyContent: "center",
      },
    },
    fontSize: "1rem",
    letterSpacing: 0,
    fontWeight: 500,
    textAlign: "center",
    paddingBottom: 0,
    margin: "0 10px",
    "&:hover": {
      color: "white",
      opacity: 1,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.darkerGrey,
    color: "white",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    width: "13em",
    marginTop: "3.1em",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "0.2em",
    [theme.breakpoints.down("md")]: {
      marginBottom: 0,
    },
  },
}));

export default useStyles;
