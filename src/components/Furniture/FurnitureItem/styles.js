import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1%",
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  media: {
    height: "40em",
    maxHeight: "200px",
    width: "90%",
    boxShadow: theme.shadows[6],
    margin: "0 auto",
    marginBottom: "-0.3em",
    borderRadius: "5px",
  },
  iconButton: {
    display: "flex",
    cursor: "default",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  actionArea: {
    display: "flex",
    justifyContent: "space-between",
    borderRadius: "10px",
    width: "90%",
    margin: "0 auto",
  },
  cardHeader: {
    padding: "5px",
  },
  actionButton: {
    fontWeight: 500,
    fontFamily: "Heebo",
    width: "33.3%",
    border: `0.5px double ${theme.palette.common.darkerWhite}`,
  },
}));

export default useStyles;
