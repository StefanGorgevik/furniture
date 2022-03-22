import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  headerWrapper: {
    minHeight: "60px",
    justifyContent: "space-between",
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
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    width: "13em",
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
