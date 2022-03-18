import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  registerButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginBottom: "1em",
  },
}));

export default useStyles;
