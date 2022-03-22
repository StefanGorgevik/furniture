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
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import AscendingImage from "assets/images/asc.png";
import DescendingImage from "assets/images/desc.png";
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
  console.log(categories);
  const theme = useTheme();
  const { matchesMD, matchesSM } = useScreenSize();

  return (
    <Grid
      item
      style={{
        flexDirection: "row",
        height: opened ? "auto" : matchesSM ? "45px" : "60px",
        width: !opened && matchesSM ? "55px" : opened ? "200px" : "80px",
        paddingBottom: "1em",
        borderBottomLeftRadius: 15,
        position: "fixed",
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
          borderBottomLeftRadius: !opened ? 5 : 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: theme.palette.common.darkerGrey,
          minWidth: "170px",
        }}
      >
        {opened && (
          <Grid
            item
            style={{
              padding: "10px",
            }}
          >
            <Typography variant="h6" color="secondary">
              Filters
            </Typography>
          </Grid>
        )}
        <Grid item>
          <IconButton onClick={() => setOpened(!opened)}>
            <SortOutlinedIcon fontSize="large" color="secondary" />
          </IconButton>
        </Grid>
      </Grid>
      {opened && (
        <>
          <Grid
            item
            container
            style={{
              paddingLeft: !opened && matchesSM ? 0 : "1em",
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
                <FormGroup
                  key={cat.id}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    padding: "2px 0",
                    transition: "1s",
                    minWidth: "170px",
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
              paddingLeft: !opened && matchesSM ? 0 : "1em",
            }}
          >
            <Grid
              item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography variant="caption" align="left">
                Sort
              </Typography>
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
                  minWidth: "170px",
                }}
              >
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
                <Box style={{ paddingRight: "15px" }}>
                  <ThumbUpIcon />
                </Box>
              </FormGroup>
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 0",
                  minWidth: "170px",
                }}
              >
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
                <Box style={{ paddingRight: "15px" }}>
                  <InsertCommentIcon />
                </Box>
              </FormGroup>
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 0",
                  minWidth: "170px",
                }}
              >
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
                <Box style={{ paddingRight: "15px" }}>
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
              paddingLeft: !opened && matchesSM ? 0 : "1em",
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
              <FormGroup
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "2px 0",
                  minWidth: "170px",
                }}
              >
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
                <Box style={{ paddingRight: "15px" }}>
                  <VerifiedUserIcon />
                </Box>
              </FormGroup>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}
