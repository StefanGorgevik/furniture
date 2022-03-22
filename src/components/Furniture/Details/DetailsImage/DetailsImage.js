import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useStyles = makeStyles({
  detailsImageContainer: {
    width: "40em",
    padding: "1%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  image: {
    maxHeight: "50em",
    width: "90%",
    margin: "0 auto",
    borderRadius: 10,
  },
  likesWrapper: {
    padding: "1%",
    width: "90%",
    margin: "0 auto",
    display: "flex",
    gap: "10px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  likes: {
    display: "flex",
    flexDirection: "row",
  },
});

const DetailsImage = ({ imageURL, likesCount, handleLikesOpen }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      container
      className={classes.detailsImageContainer}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <img src={imageURL} alt="furniture" className={classes.image} />
      </Grid>
      <Grid
        item
        container
        className={classes.likesWrapper}
        onClick={handleLikesOpen}
      >
        <Grid
          item
          style={{
            display: " flex",
            flexDirection: "row",
            alignItems: "center",
            height: "100%",
            pointerEvents: likesCount === 0 ? "none" : undefined,
          }}
        >
          <ThumbUpIcon color="primary" variant="body1" />
          <Typography variant="overline" style={{ padding: "0 5px" }}>
            Likes({likesCount})
          </Typography>
        </Grid>

        {likesCount > 0 && (
          <Grid item>
            <Typography
              onClick={handleLikesOpen}
              style={{
                textDecoration: "underline",
              }}
            >
              see all
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default DetailsImage;
