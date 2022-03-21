import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  IconButton,
  useTheme,
  Box,
} from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { useScreenSize } from "hooks/breakpoints";
import UserCheckedIcon from "components/UI/icons/UserCheckedIcon";
import { CATEGORIES } from "pages/All/All";

export function SelectCategories({
  categories,
  setCategories,
  opened,
  setOpened,
  showOwned,
  setShowOwned,
}) {
  console.log(categories);
  const theme = useTheme();
  const { matchesMD, matchesSM } = useScreenSize();

  return (
    <Grid
      item
      style={{
        flexDirection: "row",
        height: opened ? "auto" : matchesSM ? "55px" : "80px",
        width: !opened && matchesSM ? "55px" : opened ? "200px" : "80px",
        paddingBottom: "1em",
        borderBottomLeftRadius: 5,
        paddingLeft: !opened && matchesSM ? 0 : "1em",
        paddingTop: !opened && matchesSM ? 0 : "1em",
        position: matchesSM ? "fixed" : "absolute",
        zIndex: matchesMD ? 500 : 5,
        right: 0,
        borderRight: `2px double ${theme.palette.common.darkerWhite}`,
        backgroundColor: theme.palette.common.darkerWhite,
        boxShadow: matchesSM
          ? ""
          : `-2px 0px 0px -2px ${theme.palette.common.grey}`,
        transition: "0.5s",
      }}
    >
      <Grid
        item
        container
        style={{
          marginBottom: "2em",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: "150px",
        }}
      >
        {opened && (
          <Grid item style={{ paddingRight: "10px" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
          </Grid>
        )}
        <Grid item>
          <IconButton onClick={() => setOpened(!opened)}>
            <SortOutlinedIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      {opened && (
        <>
          <Grid item container style={{ marginBottom: "1em" }}>
            <Grid item>
              <Typography variant="caption">Categories</Typography>
            </Grid>
            <Grid
              item
              container
              style={{
                height: "100%",
                flexDirection: "column",
              }}
            >
              {categories.map((cat, i) => (
                <FormGroup
                  key={cat.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    padding: "2px 0",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={categories[0].value && cat.category !== "All"}
                        color="primary"
                        onChange={(e) => {
                          if (cat.category === "All") {
                            if (e.target.checked) {
                              console.log("CHK ENTERED");
                              setShowOwned(true);
                              setCategories((prevCategories) => {
                                localStorage.setItem(
                                  "categories_copy",
                                  JSON.stringify(prevCategories)
                                );
                                let newCategories = [...prevCategories];
                                newCategories.forEach(
                                  (cat) => (cat.value = false)
                                );
                                newCategories[i].value = e.target.checked;
                                localStorage.setItem(
                                  "categories",
                                  JSON.stringify(newCategories)
                                );
                                return newCategories;
                              });
                            } else {
                              const categoriesCopy =
                                localStorage.getItem("categories_copy");
                              if (categoriesCopy) {
                                setCategories(JSON.parse(categoriesCopy));
                              }
                            }
                          }
                          setCategories((prevCategories) => {
                            let newCategories = [...prevCategories];
                            newCategories[i].value = e.target.checked;
                            localStorage.setItem(
                              "categories",
                              JSON.stringify(newCategories)
                            );
                            return newCategories;
                          });
                        }}
                        checked={cat.value}
                      />
                    }
                    label={
                      cat.category === "Uncategorized" ? "Other" : cat.category
                    }
                  />
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      opacity:
                        categories[0].value && cat.category !== "All" ? 0.5 : 1,
                    }}
                    src={require(`assets/images/categoriesIcons/${cat.category}.png`)}
                    alt="category"
                  />
                </FormGroup>
              ))}
            </Grid>
          </Grid>
          <Grid item container flexDirection="column">
            <Grid item>
              <Typography variant="caption">Settings</Typography>
            </Grid>
            <Grid
              item
              container
              style={{
                height: "100%",
                flexDirection: "column",
              }}
            >
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 0",
                }}
              >
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={categories[0].value}
                        color="primary"
                        onChange={(e) => {
                          localStorage.setItem("show_owned", e.target.checked);
                          setShowOwned(e.target.checked);
                        }}
                        checked={showOwned}
                      />
                    }
                    label="Show owned"
                  />
                </Box>
                <Box style={{ paddingBottom: "15px" }}>
                  <UserCheckedIcon />
                </Box>
              </FormGroup>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
