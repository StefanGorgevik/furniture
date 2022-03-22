import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  checkoutInfo: {
    backgroundColor: theme.palette.common.darkerGrey,
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    textAlign: "left",
    padding: "3%",
    height: "100%",
    minWidth: "200px",
    maxWidth: "250px",
  },
  list: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "column",
    listStyle: "none",
  },
  listItem: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    listStyle: "none",
  },
}));

export default useStyles;
