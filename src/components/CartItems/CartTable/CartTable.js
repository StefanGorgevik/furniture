import React from "react";
import styles from "./CartTable.module.css";
import CartItem from "../CartItem/CartItem";
import { useHistory } from "react-router";
import { Card } from "@material-ui/core";

const CartTable = ({ cartItems, onRemove }) => {
  const history = useHistory();

  return (
    <Card raised style={{ width: "100%" }}>
      <table className={styles["cart-table"]}>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Ratings</th>
            <th>Date added</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <CartItem
              key={item.cartItemID}
              name={item.name}
              imageURL={item.image}
              likes={item.likes}
              reviews={item.reviews}
              dateAdded={item.dateAdded}
              price={item.price}
              onRemove={() => onRemove(item.cartItemID)}
              onOpen={() => history.push(`/furniture/details/${item.id}`)}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default CartTable;
