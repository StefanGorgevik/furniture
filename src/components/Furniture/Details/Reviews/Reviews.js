import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllReviewsAction } from "store/furniture/furnitureActions";
import StarIcon from "@material-ui/icons/Star";
import { Grid, Typography, Card, Button } from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/styles";
import { openModal } from "store/ui/uiActions";

const useStyles = makeStyles((theme) => ({
  reviews: {
    padding: "1%",
    marginTop: "2em",
    width: "100%",
    background: theme.palette.common.darkerWhite,
    [theme.breakpoints.down("md")]: {
      marginBottom: "1em",
    },
  },
  allReviews: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
    [theme.breakpoints.up("md")]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
    },
    gap: "10px",
  },
  comment: {
    width: "85%",
    margin: "1em auto",
  },
  button: {
    ...theme.typography.acceptButton,
    width: "20em",
    margin: "0 10px",
    marginTop: "1em",
  },
}));
const Reviews = ({ id, getAllReviewsAction, reviews, openModal }) => {
  const classes = useStyles();
  const reviewsCount = reviews.length;
  useEffect(() => {
    getAllReviewsAction(id);
  }, [reviewsCount, id, getAllReviewsAction]);
  const leaveReviewHandler = () => {
    openModal("review");
  };
  return (
    <Grid container className={classes.reviews}>
      <Grid
        item
        style={{
          marginTop: "1em",
          width: "100%",
        }}
      >
        <Typography variant="h4" align="center">
          Reviews
        </Typography>
      </Grid>
      <Grid item container className={classes.reviews}>
        {reviewsCount === 0 && (
          <Grid item style={{ width: "100%", margin: "0 auto" }}>
            <Typography variant="h6" align="center">
              No reviews were found for this item!
            </Typography>
            <Button onClick={leaveReviewHandler} className={classes.button}>
              Add a review
            </Button>
          </Grid>
        )}
        <Grid item container className={classes.allReviews}>
          {reviewsCount > 0 &&
            reviews.map((review) => {
              return (
                <Card
                  raised
                  key={review.id}
                  style={{
                    margin: "10px auto",
                    paddingBottom: "0.5em",
                    width: "90%",
                  }}
                >
                  <Grid
                    item
                    container
                    direction="row"
                    justifyContent="space-between"
                    style={{ paddingTop: "1em", paddingBottom: "0.5em" }}
                  >
                    <Grid
                      item
                      lg
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <PersonIcon style={{ marginRight: "0.2em" }} />
                      <Typography variant="subtitle2">
                        {review.user}
                      </Typography>{" "}
                    </Grid>

                    <Grid
                      item
                      lg
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <QueryBuilderIcon style={{ marginRight: "0.3em" }} />
                      <Typography variant="subtitle2">
                        {review.createdOn.substr(0, 10)}
                        {review.createdOn.substr(11, 5)}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      lg
                      container
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      {[...Array(review.rating).keys()].map((rat) => {
                        return <StarIcon key={rat} />;
                      })}
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    container
                    className={classes.comment}
                    direction="row"
                    alignItems="center"
                  >
                    <Typography variant="subtitle2" align="center">
                      {review.comment}
                    </Typography>
                  </Grid>
                </Card>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  reviews: state.furnitureReducer.currentFurnitureReviews,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
      getAllReviewsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
