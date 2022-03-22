import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  create: {
    padding: "1em",
    paddingTop: "1em",
    marginTop: "1em",
  },
  createButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginTop: "1em",
    marginRight: "10px",
    [theme.breakpoints.down("md")]: {
      marginBottom: "3em",
    },
  },
}));

export default useStyles;
