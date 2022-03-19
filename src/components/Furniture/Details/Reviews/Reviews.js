import React, { useEffect } from "react";
import useStyles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllReviewsAction } from "store/furniture/furnitureActions";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import StarIcon from "@material-ui/icons/Star";
import {
  Grid,
  Typography,
  Card,
  useTheme,
  Dialog,
  DialogTitle,
  IconButton,
  Slide,
  DialogContent,
} from "@material-ui/core";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => ({
  reviews: state.furnitureReducer.currentFurnitureReviews,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllReviewsAction,
    },
    dispatch
  );

const Reviews = ({
  reviewsCount,
  id,
  getAllReviewsAction,
  reviews,
  handleClose,
  open,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    if (reviews > 0) {
      getAllReviewsAction(id);
    }
  }, [reviewsCount, id, getAllReviewsAction]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      scroll="paper"
      className={classes.dialog}
      maxWidth="xl"
    >
      <DialogTitle
        style={{ background: "#535559", color: "white" }}
        id="scroll-dialog-title"
        align="left"
      >
        Reviews
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid
          item
          container
          direction="column"
          className={classes.reviews}
          alignItems="flex-end"
        >
          <Grid
            item
            container
            direction="column"
            justifyContent="center"
            spacing={4}
            className={classes.allReviews}
          >
            {reviewsCount > 0 &&
              reviews.map((review) => {
                return (
                  <Card
                    raised
                    key={review.id}
                    style={{
                      margin: "10px 0",
                      paddingBottom: "0.5em",
                      width: "50em",
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
                      spacing={5}
                    >
                      <Grid item style={{ width: "10%" }}>
                        <InsertCommentIcon
                          style={{
                            background: theme.palette.common.darkerGrey,
                            color: theme.palette.common.darkerWhite,
                          }}
                          color="primary"
                        />
                      </Grid>
                      <Grid item style={{ width: "90%" }}>
                        <Typography variant="subtitle2" align="left">
                          {review.comment}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
