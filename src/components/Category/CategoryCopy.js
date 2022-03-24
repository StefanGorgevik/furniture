import React, { useState, useEffect } from "react";
import useStyles from "./styles";
import { Grid, Typography, IconButton, Tooltip } from "@material-ui/core";
import { FurnitureItem } from "components/Furniture/FurnitureItem/FurnitureItem";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const Category = ({ itemKey, openFurnitureHandler, allFurniture }) => {
  const classes = useStyles();
  const [slide, setSlide] = useState(0);
  const [opened, setOpened] = useState(true);

  useEffect(() => {
    if (allFurniture[itemKey].length === 0) {
      setOpened(false);
    }
  }, [allFurniture, itemKey]);

  const setSlideHandler = (type) => {
    if (type === "dec") {
      if (slide === 0) {
        return;
      }
      setSlide((prevSlide) => prevSlide - 5);
    } else {
      if (allFurniture[itemKey].length <= slide + 5) {
        return;
      }
      setSlide((prevSlide) => prevSlide + 5);
    }
  };

  return (
    <Grid
      item
      container
      justifyContent="flex-start"
      style={{ marginBottom: "1em" }}
    >
      <Grid
        item
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={classes.tools}
      >
        <Grid item>
          <Typography variant="h3">
            {itemKey.toUpperCase()} ({allFurniture[itemKey].length})
          </Typography>
        </Grid>
        <Grid item container style={{ width: "80%" }} justifyContent="flex-end">
          {opened && (
            <Grid item className={classes.arrowsContainer}>
              <Grid item>
                <Tooltip title="Previous page">
                  <IconButton onClick={() => setSlideHandler("dec")}>
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Next page">
                  <IconButton onClick={() => setSlideHandler("inc")}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          )}

          <Grid item>
            <IconButton onClick={() => setOpened((prevOpened) => !prevOpened)}>
              {opened ? (
                <Tooltip title="Collapse">
                  <KeyboardArrowUpIcon />
                </Tooltip>
              ) : (
                <Tooltip title="Expand">
                  <ExpandMoreIcon />
                </Tooltip>
              )}
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {opened && (
        <Grid
          item
          container
          className={classes.itemsContainer}
          justifyContent="flex-start"
        >
          {allFurniture[itemKey].slice(slide, slide + 5).map((item) => {
            return (
              <FurnitureItem
                key={item.id}
                showIcon={true}
                price={item.price}
                isMine={item.createdBy === localStorage.getItem("user_email")}
                item={item}
                showTools={false}
                onClick={() => openFurnitureHandler(item.id)}
                onDelete={false}
                onEdit={false}
              />
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default Category;
