import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  orderButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
  },
  cartContainer: {
    padding: "5%",
  },
  totalPrice: {
    borderRadius: "10px",
    color: "white",
    padding: "2%",
    backgroundColor: theme.palette.common.main,
  },
}));

export default useStyles;
