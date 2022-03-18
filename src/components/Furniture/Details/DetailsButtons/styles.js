import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  actionButton: {
    fontWeight: 500,
    fontFamily: "Heebo",
    width: "33.3%",
    margin: "0 1em",
    border: `0.5px double ${theme.palette.common.grey}`,
  },
}));

export default useStyles;
