import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  homeContent: {
    minHeight: "100%",
  },
  homeContentItem: {
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
  // decrease: {
  //   maxHeight: 0,
  //   transformOrigin: "top",
  //   transition: "transform 0.26s ease",
  //   transform: "scaleY(0)",
  // },
  // decreaseActive: {
  //   maxHeight: "100%",
  //   transform: "scaleY(1)",
  // },
  // topPush: {
  //   marginTop: 500,
  //   transform: "scale(0.85)",
  //   transition: "all 700ms",
  // },
  // topNoPush: {
  //   marginTop: "0",
  //   opacity: " 1",
  //   transform: "scale(1)",
  // },
}));

export default useStyles;
