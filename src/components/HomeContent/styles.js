import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  homeContent: {
    minHeight: "100%",
  },
  homeContentItem: {
    borderRadius: "50%",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
  },
  homeButton: {
    width: "20em",
    margin: "0 10px",
    marginTop: "2em",
    opacity: 1,
  },
  logoImage: {
    borderRadius: "10px",
    height: "auto",
    marginTop: "10px",
    marginBottom: "50px",
    position: "relative",
  },
  landingHeader: {
    marginBottom: "1em",
  },
  landingItemsWrapper: {
    margin: "1em auto",
    width: "40%",
    borderRadius: "8px",
  },
  mainTitle: {},
  lampOn: {
    width: "4em",
    marginTop: "-0.4em",
    marginBottom: "1em",
    zIndex: 10,
  },
}));

export default useStyles;
