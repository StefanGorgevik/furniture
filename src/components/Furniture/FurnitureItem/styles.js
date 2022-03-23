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
    width: "350px",
    boxShadow: "50px",
    "&:hover": {
      backgroundColor: "#faf5f5",
      boxShadow: "150px", // theme.shadows[20]
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
      width: "90%",
    },
  },
  cardContent: {
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  media: {
    height: "200px",
    maxHeight: "200px",
    width: "100%",
    boxShadow: theme.shadows[6],
    margin: "0 auto",
    marginBottom: "-0.3em",
    borderRadius: "5px",
  },
  iconButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  },
}));

export default useStyles;
