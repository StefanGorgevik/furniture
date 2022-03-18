import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
    left: "0px",
    width: "90%",
    margin: "0 auto",
  },
  closeButton: {
    position: "relative",
    left: "350px",
    color: "white",
  },
}));

export default useStyles;
