import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  homePage: {
    background: `linear-gradient(to bottom, ${theme.palette.common.darkerWhite} 2%, 'white' 99%)`,
  },
}));

export default useStyles;
