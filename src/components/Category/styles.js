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
    borderRadius: "5px",
    borderRight: `1px solid ${theme.palette.common.darkerGrey}`,
    borderLeft: `1px solid ${theme.palette.common.darkerGrey}`,
  },
}));

export default useStyles;
