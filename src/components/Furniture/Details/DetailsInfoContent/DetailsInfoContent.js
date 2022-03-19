import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DetailsButtons from "components/Furniture/Details/DetailsButtons/DetailsButtons";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    width: "42em",
    height: "100%",
  },
  gridItem: {
    paddingLeft: "2%",
    paddingRight: "2%",
    margin: "1%",
    // background: theme.palette.common.backgroundColor,

    borderBottom: "1px solid black",
    // borderRadius: "4px",
  },
}));

const DetailsInfoContent = ({
  currentFurniture,
  setLiked,
  liked,
  onAddToCart,
  onEdit,
  handleReviewsOpen,
  handleLikesOpen,
  reviewsCount,
  likesCount,
}) => {
  const classes = useStyles();
  const items = [
    { label: "category", text: currentFurniture.category },
    { label: "year", text: currentFurniture.year },
    { label: "material", text: currentFurniture.material },
    { label: "price", text: `€ ${currentFurniture.price}` },
  ];
  console.log("currentfurniture SUBMIT DETAILS INFO ", reviewsCount);
  return (
    <Grid
      item
      container
      className={classes.detailsContainer}
      direction="column"
    >
      <Grid item container style={{ padding: "0.5em" }}>
        <Grid item style={{ padding: "0.5em", width: "50%" }}>
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
      <Grid item style={{ padding: "0.5em" }}>
        <Typography align="left" variant="subtitle2">
          {currentFurniture.description}
        </Typography>
      </Grid>

      <Grid item container direction="row" style={{ marginBottom: "2em" }}>
        <Grid
          item
          container
          direction="column"
          justifyContent="flex-start"
          style={{
            width: "50%",
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

        <Grid
          item
          container
          direction="column"
          justifyContent="flex-end"
          style={{ width: "50%", paddingRight: "1em" }}
        >
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            onClick={handleLikesOpen}
            style={{
              marginBottom: "1em",
              cursor: "pointer",
              pointerEvents: likesCount === 0 ? "none" : undefined,
            }}
          >
            <ThumbUpIcon style={{ marginRight: "0.5em" }} color="primary" />
            <Typography style={{ marginRight: "0.5em" }} variant="h4">
              likes ({likesCount})
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            onClick={handleReviewsOpen}
            style={{
              cursor: "pointer",
              pointerEvents: reviewsCount === 0 ? "none" : undefined,
            }}
          >
            <InsertCommentIcon
              style={{ marginRight: "0.5em" }}
              color="primary"
            />
            <Typography style={{ marginRight: "0.5em" }} variant="h4">
              reviews ({reviewsCount})
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DetailsInfoContent;
