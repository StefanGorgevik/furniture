import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  reviews: {
    padding: "1%",
    marginTop: "2em",
    width: "100%",
  },
  comment: {
    padding: "1%",
    backgroundColor: theme.palette.common.backgroundColor,
    margin: "0 auto",
    borderRadius: "4px",
    width: "90%",
  },
  appBar: {
    position: "fixed",
    left: "0px",
    width: "90%",
    margin: "0 auto",
  },
  closeButton: {
    position: "relative",
    left: "690px",
    color: "white",
  },
}));
export default useStyles;
