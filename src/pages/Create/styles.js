import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  create: {
    padding: "1em",
    paddingTop: "1em",
    marginTop: "3em",
  },
  createButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginTop: "2em",
    marginRight: "10px",
  },
}));

export default useStyles;
