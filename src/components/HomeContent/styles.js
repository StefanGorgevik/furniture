import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  homeContent: {
    minHeight: "1000px",
  },
  "@keyframes background": {
    "0%": {
      background: "black",
      marginBottom: "1000px",
    },
    "100%": {
      marginBottom: 0,
      height: "auto",
      background: "#EEEEEE",
    },
  },
  homeContentItem: {
    marginBottom: "3em",
    borderRadius: "50%",
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
    marginBottom: "3em",
  },
  landingItemsWrapper: {
    margin: "1em auto",
    width: "40%",
    borderRadius: "8px",
  },
  animationStart: {
    display: "none",
  },
  animationEnter: {
    display: "none",
  },
  animationDone: {
    display: "block",
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
