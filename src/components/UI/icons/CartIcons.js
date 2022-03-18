import styles from "./Icons.module.css";
import classNames from "classnames";
import Tooltip from "@material-ui/core/Tooltip";

export const ShoppingCartIcon = () => {
  return <i className="fas fa-shopping-cart"></i>;
};

export const AddToCartIcon = ({ onClick }) => {
  const classes = classNames("fas fa-cart-plus", styles["add-to-cart-icon"]);
  return (
    <Tooltip title="Add to cart">
      <i onClick={onClick} className={classes}></i>
    </Tooltip>
  );
};
