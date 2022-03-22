import { likeFurnitureAction } from "store/furniture/furnitureActions";
import { openModal } from "store/ui/uiActions";
import useStyles from "./styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button, Grid, Tooltip } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

const ButtonContainer = ({ children, onClick, tooltip }) => {
  const classes = useStyles();

  return (
    <Tooltip title={tooltip}>
      <Grid item>
        <Button
          className={classes.actionButton}
          onClick={onClick}
          size="small"
          color="primary"
        >
          {children}
        </Button>
      </Grid>
    </Tooltip>
  );
};

const DetailsButtons = ({
  createdBy,
  openModal,
  id,
  likeFurnitureAction,
  liked,
  setLiked,
  onEdit,
  onAddToCart,
}) => {
  const isMyFurniture = createdBy === localStorage.getItem("user_email");

  const leaveReviewHandler = () => {
    openModal("review");
  };

  const likeHandler = (type) => {
    setLiked(true);
    if (type === "remove-like") setLiked(false);
    likeFurnitureAction({ id, type });
  };

  const deleteFurnitureHandler = (id) => {
    openModal("delete", { id, shouldRedirect: true });
  };

  return (
    <Grid
      item
      container
      direction="row"
      justify="flex-end"
      alignItems="flex-end"
      style={{
        marginBottom: "1em",
        position: "relative",
        width: "50%",
      }}
    >
      {!isMyFurniture &&
        (liked ? (
          <ButtonContainer
            tooltip="Dislike"
            onClick={() => likeHandler("remove-like")}
          >
            <FavoriteIcon />
          </ButtonContainer>
        ) : (
          <ButtonContainer tooltip="Like" onClick={() => likeHandler("like")}>
            <FavoriteBorderIcon />
          </ButtonContainer>
        ))}
      {!isMyFurniture && (
        <ButtonContainer tooltip="Add a review" onClick={leaveReviewHandler}>
          <InsertCommentIcon />
        </ButtonContainer>
      )}
      {/* {!isMyFurniture && (
        <ButtonContainer onClick={onAddToCart}>
          <AddShoppingCartIcon />
        </ButtonContainer>
      )} */}
      {isMyFurniture && (
        <>
          <ButtonContainer tooltip="Edit furniture" onClick={onEdit}>
            <EditIcon />
          </ButtonContainer>

          <ButtonContainer
            tooltip="Delete furniture"
            onClick={() => deleteFurnitureHandler(id)}
          >
            <DeleteIcon />
          </ButtonContainer>
        </>
      )}
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openModal,
      likeFurnitureAction,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(DetailsButtons);
