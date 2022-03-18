import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ModalButtons from "../ModalButtons/ModalButtons";
import { removeFromCartAction } from "store/cart/cartActions";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";
import { Grid } from "@material-ui/core";

const RemoveFromCartModal = ({
  modalData,
  closeModal,
  removeFromCartAction,
}) => {
  const id = modalData ? modalData.id : "";

  const removeCartItemHandler = () => {
    removeFromCartAction(id);
  };
  return (
    <Grid item container>
      <WarningModalsContent text="Are you sure you want to remove this cart item?" />
      <ModalButtons
        onSubmit={removeCartItemHandler}
        onClose={closeModal}
        submitButtonText="Remove"
      />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  modalData: state.uiReducer.modalData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal,
      removeFromCartAction,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RemoveFromCartModal);
