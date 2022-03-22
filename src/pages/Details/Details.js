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
import { useScreenSize } from "hooks/breakpoints";

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
  const furnitureID = params.id;
  const { matchesSM } = useScreenSize();
  const [likesOpened, setLikesOpened] = React.useState(false);
  useEffect(() => {
    if (furnitureID && !currentFurnitureLoaded) {
      openFurnitureAction({ id: furnitureID, shouldRedirect: true });
    }
  }, [furnitureID, openFurnitureAction, currentFurnitureLoaded]);

  useEffect(() => {
    if (!currentFurniture.likes) return;
    const username = localStorage.getItem("username");
    const liked = currentFurniture.likes.find((like) => like.user === username);
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
          justify="space-evenly"
          alignItems="center"
          style={{
            marginTop: "2em",
            minHeight: "100%",
            marginBottom: matchesSM ? "2em" : 0,
          }}
        >
          <DetailsImage
            imageURL={currentFurniture.image}
            likes={currentFurniture.likes ? currentFurniture.likes : []}
            likesCount={
              currentFurniture.likes ? currentFurniture.likes.length : 0
            }
            handleLikesOpen={() => setLikesOpened(true)}
          />
          <DetailsInfoContent
            currentFurniture={currentFurniture}
            liked={furnitureLiked}
            setLiked={setFurnitureLiked}
            onEdit={editFurnitureHandler}
            onAddToCart={() => addToCartHandler(currentFurniture)}
          />
        </Grid>

        <Reviews id={currentFurniture.id} />

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
