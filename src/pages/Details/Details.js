import React, { useEffect, useState } from "react";
// import useStyles from "./styles";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  openFurnitureAction,
  editFurnitureAction,
} from "store/furniture/furnitureActions";
import { addToCartAction } from "store/cart/cartActions";
import Reviews from "components/Furniture/Details/Reviews/Reviews";
import DetailsInfoContent from "components/Furniture/Details/DetailsInfoContent/DetailsInfoContent";
import DetailsImage from "components/Furniture/Details/DetailsImage/DetailsImage";
import { Grid } from "@material-ui/core";
import Likes from "components/Furniture/Details/Likes/Likes";

const Details = ({
  currentFurniture,
  openFurnitureAction,
  currentFurnitureLoaded,
  editFurnitureAction,
  addToCartAction,
}) => {
  const history = useHistory();
  const [furnitureLiked, setFurnitureLiked] = useState(false);
  const params = useParams();
  let furnitureID = params.id;
  console.log("SUBMIT likes", currentFurniture);
  const [reviewsOpened, setReviewsOpened] = React.useState(false);
  const [likesOpened, setLikesOpened] = React.useState(false);
  useEffect(() => {
    if (furnitureID && !currentFurnitureLoaded) {
      openFurnitureAction({ id: furnitureID, shouldRedirect: true });
    }
  }, [furnitureID, openFurnitureAction, currentFurnitureLoaded]);

  useEffect(() => {
    if (!currentFurniture.likes) return;
    const userMail = localStorage.getItem("user_email");
    const liked = currentFurniture.likes.find((like) => like.user === userMail);
    if (liked) {
      setFurnitureLiked(true);
    }
  }, [currentFurniture.likes]);

  const editFurnitureHandler = () => {
    const furniture = {
      name: currentFurniture.name,
      category: currentFurniture.category,
      year: currentFurniture.year,
      description: currentFurniture.description,
      price: currentFurniture.price,
      image: currentFurniture.image,
      material: currentFurniture.material,
    };
    editFurnitureAction({ furniture, editing: true });
    history.push(`/furniture/edit/${furnitureID}`);
  };

  const addToCartHandler = (furniture) => {
    addToCartAction(furniture);
  };

  if (!currentFurnitureLoaded) {
    return null;
  } else {
    return (
      <>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          style={{ marginTop: "2em" }}
        >
          <DetailsImage
            likes={currentFurniture.likes ? currentFurniture.likes : []}
            imageURL={currentFurniture.image}
          />
          <DetailsInfoContent
            currentFurniture={currentFurniture}
            liked={furnitureLiked}
            setLiked={setFurnitureLiked}
            onEdit={editFurnitureHandler}
            onAddToCart={() => addToCartHandler(currentFurniture)}
            reviewsCount={
              currentFurniture.reviews ? currentFurniture.reviews.length : 0
            }
            likes={currentFurniture.likes ? currentFurniture.likes : []}
            likesCount={
              currentFurniture.likes ? currentFurniture.likes.length : 0
            }
            handleReviewsOpen={() => setReviewsOpened(true)}
            handleLikesOpen={() => setLikesOpened(true)}
          />
        </Grid>

        <Reviews
          reviews={currentFurniture.reviews}
          reviewsCount={
            currentFurniture.reviews ? currentFurniture.reviews.length : 0
          }
          id={currentFurniture.id}
          handleClose={() => setReviewsOpened(!reviewsOpened)}
          open={reviewsOpened}
        />

        <Likes
          likes={currentFurniture.likes ? currentFurniture.likes : []}
          likesCount={
            currentFurniture.likes ? currentFurniture.likes.length : 0
          }
          id={currentFurniture.id}
          handleClose={() => setLikesOpened(!likesOpened)}
          open={likesOpened}
        />
      </>
    );
  }
};

const mapStateToProps = (state) => ({
  currentFurniture: state.furnitureReducer.currentFurniture,
  reviews: state.furnitureReducer.currentFurnitureReviews,
  currentFurnitureLoaded: state.furnitureReducer.currentFurnitureLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openFurnitureAction,
      editFurnitureAction,
      addToCartAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Details);
