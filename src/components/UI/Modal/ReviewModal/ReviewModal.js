import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ModalButtons from "components/UI/Modal/ModalButtons/ModalButtons";
import { Input } from "components/UI/Inputs/Inputs";
import {
  submitReviewAction,
  getAllReviewsAction,
} from "store/furniture/furnitureActions";
import { closeModal } from "store/ui/uiActions";
import { Grid, useTheme, Typography, IconButton } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { useNavigate } from "react-router";
const ReviewModal = ({
  closeModal,
  furnitureID,
  submitReviewAction,
  getAllReviewsAction,
}) => {
  const theme = useTheme();
  const [stars, setStars] = useState(null);
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const { matchesSM } = useScreenSize();
  const navigate = useNavigate();
  const setStarsHandler = (star) => {
    if (star === 1 && stars === 1) return setStars(null);
    setStars(star);
  };

  const setReviewHandler = (e) => {
    setReview(e.target.value);
  };

  const submitReview = () => {
    if (!stars) return;
    if (review.length === 0) return setError(true);
    const newReview = {
      rating: stars,
      comment: review,
    };
    setError(false);
    submitReviewAction(newReview, furnitureID, navigate);
    closeModal();
    getAllReviewsAction(furnitureID);
  };

  return (
    <Grid container justifyContent="center">
      <Typography variant="h3" color="primary" gutterBottom>
        Leave a review
      </Typography>
      <Grid
        item
        container
        justifyContent="center"
        style={{ marginBottom: matchesSM ? "10px" : "30px", marginTop: "20px" }}
      >
        {[0, 1, 2, 3, 4].map((star, i) => {
          return star >= stars ? (
            <Grid item key={star}>
              <IconButton onClick={() => setStarsHandler(star + 1)}>
                <StarBorderIcon
                  style={{
                    fontSize: matchesSM ? "30px" : "40px",
                  }}
                />
              </IconButton>
            </Grid>
          ) : (
            <Grid item key={star}>
              <IconButton onClick={() => setStarsHandler(star + 1)}>
                <StarIcon
                  style={{
                    fontSize: matchesSM ? "30px" : "40px",
                  }}
                />
              </IconButton>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        container
        style={{
          backgroundColor: theme.palette.common.darkerWhite,
          padding: "0 1em",
          paddingBottom: 0,
          borderRadius: "4px",
          margin: matchesSM ? "0 5px" : "0 2em",
          marginTop: "1em",
        }}
      >
        <Input
          label="Description"
          type="text"
          id="description"
          value={review}
          onChange={setReviewHandler}
          rows={5}
          error={error}
        />
      </Grid>
      <ModalButtons
        onSubmit={submitReview}
        onClose={closeModal}
        submitButtonText="Submit review"
      />
    </Grid>
  );
};
const mapStateToProps = (state) => ({
  modal: state.uiReducer,
  furnitureID: state.furnitureReducer.currentFurniture.id,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal,
      submitReviewAction,
      getAllReviewsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
