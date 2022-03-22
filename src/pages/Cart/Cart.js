import React, { useEffect } from "react";
import useStyles from "./styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CartTable from "components/CartItems/CartTable/CartTable";
import NoItemsFound from "components/Furniture/NoItemsFound/NoItemsFound";
import { getCartDataAction } from "store/cart/cartActions";
import { openModal } from "store/ui/uiActions";
import { Button, Grid, Typography } from "@material-ui/core";

const Cart = ({
  getCartDataAction,
  cartItems,
  cartItemsLoaded,
  loading,
  totalPrice,
  openModal,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCartDataAction();
  }, [getCartDataAction]);

  const orderHandler = () => {
    openModal("checkout");
  };

  const removeItemFromCartHandler = (cartItemID) => {
    openModal("remove-cart", { id: cartItemID, shouldRedirect: false });
  };

  if ((cartItems.length === 0 && !loading) || !cartItemsLoaded) {
    return (
      <NoItemsFound
        text="No cart items found!"
        subText="Browse and find what you like"
        buttonText="Browse"
        location="/furniture/all"
      />
    );
  } else {
    return (
      <Grid container direction="row" className={classes.cartContainer}>
        <Grid item container>
          <CartTable
            cartItems={cartItems}
            onRemove={removeItemFromCartHandler}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.totalPrice}
        >
          <Grid item>
            <Typography variant="h6" color="primary">
              total price:
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="primary">
              {totalPrice}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justify="flex-end">
          <Button onClick={orderHandler} className={classes.orderButton}>
            Order
          </Button>
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => ({
  loading: state.uiReducer.loading,
  cartItems: state.cartReducer.cartItems,
  cartItemsLoaded: state.cartReducer.cartItemsLoaded,
  totalPrice: state.cartReducer.totalPrice,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCartDataAction, openModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
