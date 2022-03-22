import { createMuiTheme } from "@material-ui/core/styles";
const mainGrey = "#535559";
const darkerWhite = "#EEEEEE";
const darkerGrey = "#222831";
const backgroundColor = "rgba(151, 138, 138, 0.287)";
export default createMuiTheme({
  palette: {
    common: {
      grey: mainGrey,
      darkerGrey: darkerGrey,
      darkerWhite: darkerWhite,
      backgroundColor: backgroundColor,
    },
    primary: {
      main: mainGrey,
    },
    secondary: {
      main: darkerWhite,
    },
  },
  typography: {
    caption: {
      fontColor: mainGrey,
      fontWeight: "500",
      fontFamily: "Heebo",
      fontSize: "1.25rem",
    },
    tab: {
      fontFamily: "Heebo",
      letterSpacing: 3,
    },
    h1: {
      textTransform: "uppercase",
      fontFamily: "Paytone One",
      fontSize: "2.5rem",
    },
    h2: {
      fontFamily: "Paytone One",
      fontWeight: 700,
      fontSize: "1.75rem",
      color: "black",
      lineHeight: "1.5",
    },
    h3: {
      fontFamily: "Heebo",
      fontSize: "1.3rem",
      letterSpacing: "0.1em",
      color: mainGrey,
      textTransform: "uppercase",
    },
    h4: {
      fontFamily: "Heebo",
      fontSize: "1.5rem",
      letterSpacing: "1px",
      textTransform: "uppercase",
      color: mainGrey,
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Heebo",
      fontSize: "1.5rem",
      color: mainGrey,
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Heebo",
      textTransform: "uppercase",
    },
    subtitle1: {
      fontFamily: "Heebo",
      color: "black",
      fontSize: "1.2rem",
      fontWeight: 300,
      opacity: 0.8,
    },
    subtitle2: {
      fontFamily: "Heebo",
      fontSize: "1rem",
    },
    overline: {
      fontSize: "1.2rem",
    },
    acceptButton: {
      height: "3em",
      color: darkerWhite,
      background: darkerGrey,
      fontFamily: "Heebo",
      transition: "1s",
      "&:hover": {
        background: mainGrey,
        color: "#eee",
      },
    },
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: mainGrey,
        fontSize: "1rem",
      },
    },
    MuiInput: {
      color: "black",
      underline: {
        "&:before": {
          borderBottom: `2px solid ${darkerWhite}`,
        },
      },
    },
    MuiCardHeader: {
      title: {
        fontFamily: "Heebo",
        textTransform: "lowercase",
        fontWeight: 300,
      },
    },
    MuiDialog: {
      scrollPaper: { overflowX: "hidden" },
      paper: { overflowX: "hidden" },
    },
    MuiDialogContent: {
      root: { overflowX: "hidden" },
    },
    MuiChecked: {
      color: darkerGrey,
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
        fontFamily: "Heebo",
      },
    },
  },
});
