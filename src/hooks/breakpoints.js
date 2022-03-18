import { useMediaQuery, useTheme } from "@material-ui/core";

export const useScreenSize = () => {
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const matchesMDUP = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLGUP = useMediaQuery(theme.breakpoints.up("lg"));

  return {
    matchesSM,
    matchesMD,
    matchesMDUP,
    matchesLGUP,
  };
};
