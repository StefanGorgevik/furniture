import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DetailsButtons from "components/Furniture/Details/DetailsButtons/DetailsButtons";
import { useScreenSize } from "hooks/breakpoints";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    height: "100%",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  gridItem: {
    margin: "1%",
    borderBottom: "1px solid black",
  },
  descriptionWrapper: {
    padding: "0.5em",
    margin: "0 auto",
    marginTop: "1em",
    marginBottom: "1em",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
}));

const DetailsInfoContent = ({
  currentFurniture,
  setLiked,
  liked,
  onAddToCart,
  onEdit,
}) => {
  const classes = useStyles();
  const { matchesSM, matchesMD } = useScreenSize();
  const items = [
    { label: "category", text: currentFurniture.category },
    { label: "year", text: currentFurniture.year },
    { label: "material", text: currentFurniture.material },
    { label: "price", text: `€ ${currentFurniture.price}` },
  ];
  return (
    <Grid
      item
      container
      className={classes.detailsContainer}
      direction="column"
    >
      <Grid
        item
        container
        style={{
          margin: "0 auto",
          width: matchesMD ? "90%" : "100%",
          flexDirection: matchesSM ? "column" : "row",
        }}
      >
        <Grid
          item
          style={{
            padding: "0.5em",
            width: matchesSM ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: matchesSM ? "center" : "flex-start",
            alignItems: matchesSM ? "center" : "flex-start",
          }}
        >
          <Typography
            align="left"
            variant="h2"
            style={{ textTransform: "uppercase" }}
          >
            {currentFurniture.name}
          </Typography>
          <Typography align="left" variant="subtitle1">
            {currentFurniture.createdBy}
          </Typography>

          <Typography align="left" variant="subtitle1">
            {currentFurniture.createdOn.substr(0, 10)} -
            {currentFurniture.createdOn.substr(11, 5)}
          </Typography>
        </Grid>
        <DetailsButtons
          id={currentFurniture.id}
          liked={liked}
          setLiked={setLiked}
          createdBy={currentFurniture.createdBy}
          onEdit={onEdit}
          onAddToCart={onAddToCart}
        />
      </Grid>
      <Grid item className={classes.descriptionWrapper}>
        <Typography align={matchesMD ? "center" : "left"} variant="subtitle2">
          {currentFurniture.description}
        </Typography>
      </Grid>

      <Grid
        item
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{
          width: matchesMD ? "90%" : "100%",
          marginTop: "1em",
          margin: "0 auto",
        }}
      >
        {items.map((item, i) => {
          return (
            <Grid
              item
              container
              direction="row"
              className={classes.gridItem}
              key={`${item.label}${i}`}
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Grid item>
                <Typography variant="h6">{item.label}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" align="center">
                  {item.text}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default DetailsInfoContent;
