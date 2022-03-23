import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  itemsContainer: {
    width: "99vw",
    overflowY: "auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr",
    padding: "1%",
    borderRadius: "5px",
  },
  tools: {
    paddingLeft: "1%",
    paddingRight: "1%",
    borderRadius: "5px",
    backgroundColor: theme.palette.common.darkerWhite,
  },
  arrowsContainer: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    borderRadius: "5px",
    borderRight: `1px solid ${theme.palette.common.darkerGrey}`,
    borderLeft: `1px solid ${theme.palette.common.darkerGrey}`,
  },
  closeButton: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 auto",
    marginBottom: "1em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "1em",
    },
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2px 0",
    minWidth: "170px",
  },
}));

export default useStyles;
