import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    background: `linear-gradient(to right, ${theme.palette.common.grey} 10%, ${theme.palette.common.darkerGrey} 90%)`,
  },
  logo: {
    marginLeft: "3em",
    marginTop: "0.3em",
  },
  tabs: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
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
    borderRadius: "0px",
    width: "17.5em",
    marginTop: "3.1em",
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "0.2em",
  },
  searchIcon: {
    color: "white",
    marginLeft: "400px",
    "&:hover": {
      background: "transparent",
    },
  },
}));

export default useStyles;
