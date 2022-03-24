import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import { orderSuccessfulAction } from "store/cart/cartActions";
// import CheckoutInfo from "components/Checkout/CheckoutInfo/CheckoutInfo";
// import CheckoutForm from "components/Checkout/CheckoutForm/CheckoutForm";
// import { Grid } from "@material-ui/core";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";
import ModalButtons from "../ModalButtons/ModalButtons";

const CheckoutModal = ({
  closeModal,
  cartItems,
  // totalPrice,
  orderSuccessfulAction,
}) => {
  let cartItemsInfo = [];
  for (const item of cartItems) {
    cartItemsInfo.push({ name: item.name, price: item.price });
  }

  return (
    // <Grid item container justifyContent="space-between" style={{ padding: "1%" }}>
    //   <CheckoutInfo cartItemsInfo={cartItemsInfo} totalPrice={totalPrice} />
    //   <CheckoutForm
    //     onClose={closeModal}
    //     onOrderSuccess={orderSuccessfulAction}
    //   />
    // </Grid>
    <>
      <WarningModalsContent text="Are you sure you want to order?" />
      <ModalButtons
        onSubmit={orderSuccessfulAction}
        onClose={closeModal}
        submitButtonText="Order"
      />
    </>
  );
};
const mapStateToProps = (state) => ({
  cartItems: state.cartReducer.cartItems,
  totalPrice: state.cartReducer.totalPrice,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal,
      orderSuccessfulAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);
