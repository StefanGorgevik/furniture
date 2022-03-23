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
  Button,
  Tooltip,
} from "@material-ui/core";
import SortOutlinedIcon from "@material-ui/icons/SortOutlined";
import { useScreenSize } from "hooks/breakpoints";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import AscendingImage from "assets/images/asc.png";
import DescendingImage from "assets/images/desc.png";
import useStyles from "./styles";

export function SelectCategories({
  categories,
  setCategories,
  opened,
  setOpened,
  showOwned,
  setShowOwned,
  sortByLikes,
  setSortByLikes,
  sortByReviews,
  setSortByReviews,
  sortByPrice,
  setSortByPrice,
  order,
  setOrder,
}) {
  const theme = useTheme();
  const { matchesMD, matchesSM } = useScreenSize();
  const classes = useStyles(opened, matchesSM);
  return (
    <Grid
      item
      style={{
        flexDirection: "row",
        height: opened ? "auto" : "60px",
        width:
          !opened && matchesSM
            ? "100%"
            : opened
            ? matchesSM
              ? "100%"
              : "250px"
            : "80px",
        paddingBottom: "1em",
        margin: matchesSM ? "0 auto" : "auto",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: matchesSM && opened ? 15 : 0,
        position: "absolute",
        zIndex: matchesMD ? 500 : 5,
        right: matchesSM ? "-3px" : "-2px",
        left: matchesSM ? "-1px" : "auto",
        top: 60,
        borderRight: `2px double ${theme.palette.common.darkerWhite}`,
        backgroundColor: theme.palette.common.darkerWhite,
        boxShadow: matchesSM
          ? ""
          : `-2px 0px 0px -2px ${theme.palette.common.grey}`,
        transition: "0.5s",
        marginTop: matchesSM ? "10px" : 0,
      }}
    >
      <Grid
        item
        container
        style={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: matchesSM ? "flex-end" : "space-between",
          background: theme.palette.common.darkerGrey,
          minWidth: "170px",
        }}
        onClick={() => setOpened(!opened)}
      >
        <IconButton focusRipple>
          <SortOutlinedIcon fontSize="large" color="secondary" />
        </IconButton>
      </Grid>
      {opened && (
        <>
          <Grid
            item
            container
            style={{
              width: matchesSM ? "70%" : "90%",
              margin: matchesSM ? "0 auto" : "auto",
              paddingTop: matchesSM ? "1.5em" : "0.5em",
            }}
          >
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
                <FormGroup key={cat.id} className={classes.formGroup}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled={categories[0].value && cat.category !== "All"}
                        color="primary"
                        onChange={(e) => {
                          if (cat.category === "All") {
                            if (e.target.checked) {
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

          <Grid
            item
            container
            direction="column"
            style={{
              width: matchesSM ? "70%" : "90%",
              margin: matchesSM ? "0 auto" : "auto",
            }}
          >
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="caption" align="left">
                Sort
              </Typography>
              <Tooltip
                title={order === "asc" ? "Sort descending" : "Sort ascending"}
              >
                <IconButton
                  onClick={() =>
                    setOrder((prevOrder) => {
                      let order = "asc";
                      if (prevOrder === "asc") {
                        order = "desc";
                      }
                      localStorage.setItem("order", order);
                      return order;
                    })
                  }
                >
                  {order === "asc" ? (
                    <img src={AscendingImage} alt="ascending" />
                  ) : (
                    <img src={DescendingImage} alt="descending" />
                  )}
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid
              item
              container
              style={{
                height: "100%",
                flexDirection: "column",
              }}
            >
              <FormGroup className={classes.formGroup}>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setSortByReviews(false);
                            setSortByPrice(false);
                            localStorage.setItem("sort_by_reviews", false);
                            localStorage.setItem("sort_by_price", false);
                          }
                          setSortByLikes(checked);
                          localStorage.setItem("sort_by_likes", checked);
                        }}
                        checked={sortByLikes}
                      />
                    }
                    label="Likes"
                  />
                </Box>
                <Box>
                  <ThumbUpIcon />
                </Box>
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (checked) {
                            setSortByLikes(false);
                            setSortByPrice(false);
                            localStorage.setItem("sort_by_likes", false);
                            localStorage.setItem("sort_by_price", false);
                          }
                          setSortByReviews(checked);

                          localStorage.setItem("sort_by_reviews", checked);
                        }}
                        checked={sortByReviews}
                      />
                    }
                    label="Reviews"
                  />
                </Box>
                <Box>
                  <InsertCommentIcon />
                </Box>
              </FormGroup>
              <FormGroup className={classes.formGroup}>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSortByPrice(checked);
                          if (checked) {
                            setSortByLikes(false);
                            setSortByReviews(false);
                            localStorage.setItem("sort_by_likes", false);
                            localStorage.setItem("sort_by_reviews", false);
                          }
                          localStorage.setItem("sort_by_price", checked);
                        }}
                        checked={sortByPrice}
                      />
                    }
                    label="Price"
                  />
                </Box>
                <Box>
                  <InsertCommentIcon />
                </Box>
              </FormGroup>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="column"
            style={{
              width: matchesSM ? "70%" : "90%",
              margin: matchesSM ? "0 auto" : "auto",
            }}
          >
            <Grid item style={{ display: "flex" }}>
              <Typography variant="caption">Settings</Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              style={{
                height: "100%",
              }}
            >
              <FormGroup className={classes.formGroup}>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
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
                <Box>
                  <VerifiedUserIcon />
                </Box>
              </FormGroup>
            </Grid>
          </Grid>
          {opened && matchesSM && (
            <Grid item container>
              <Button
                onClick={(e) => setOpened(false)}
                className={classes.closeButton}
              >
                Close
              </Button>
            </Grid>
          )}
        </>
      )}
    </Grid>
  );
}
