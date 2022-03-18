import React from "react";
import styles from "./CartItem.module.css";
import DeleteIcon from "@material-ui/icons/Delete";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { IconButton } from "@material-ui/core";

const CartItem = (props) => {
  const { name, imageURL, likes, reviews, dateAdded, price, onRemove, onOpen } =
    props;
  return (
    <tr className={styles["cart-item"]}>
      <td className={styles["image-td"]}>
        <img src={imageURL} alt="furniture" />
      </td>
      <td>{name}</td>
      <td className={styles["reviews-likes"]}>
        <span>
          <ThumbUpIcon style={{ marginRight: "1em" }} /> {likes}
        </span>
        <span>
          <InsertCommentIcon style={{ marginRight: "1em" }} />
          {reviews}
        </span>
      </td>
      <td>
        {dateAdded.substr(0, 10)} {dateAdded.substr(11, 5)}
      </td>
      <td>€{price}</td>
      <td>
        <span>
          <IconButton onClick={onOpen}>
            <VisibilityIcon color="secondary" />
          </IconButton>
          <IconButton onClick={onRemove}>
            <DeleteIcon color="secondary" />
          </IconButton>
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
