import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  saveButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginTop: "2em",
  },
}));

export default useStyles;
