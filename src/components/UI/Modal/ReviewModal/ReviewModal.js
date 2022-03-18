import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styles from "./ReviewModal.module.css";
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
    submitReviewAction(newReview, furnitureID);
    closeModal();
    getAllReviewsAction(furnitureID);
  };

  return (
    <div className={styles["review-modal"]}>
      <Typography variant="h3" color="primary">
        Leave a review
      </Typography>
      <div className={styles["review-modal-stars"]}>
        {[0, 1, 2, 3, 4].map((star, i) => {
          return star >= stars ? (
            <IconButton key={star} onClick={() => setStarsHandler(star + 1)}>
              <StarBorderIcon />
            </IconButton>
          ) : (
            <IconButton key={star} onClick={() => setStarsHandler(star + 1)}>
              <StarIcon />
            </IconButton>
          );
        })}
      </div>
      <Grid
        item
        style={{
          backgroundColor: theme.palette.common.darkerWhite,
          padding: "0 1em",
          paddingBottom: 0,
          borderRadius: "4px",
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
          helperText={error ? "Enter your experience with the product!" : ""}
        />
      </Grid>
      <ModalButtons
        onSubmit={submitReview}
        onClose={closeModal}
        submitButtonText="Submit review"
      />
    </div>
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
