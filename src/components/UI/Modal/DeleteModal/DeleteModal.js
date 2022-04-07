import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ModalButtons from "../ModalButtons/ModalButtons";
import { deleteFurnitureAction } from "store/furniture/furnitureActions";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";
import { useNavigate } from "react-router";

const DeleteModal = ({ modalData, closeModal, deleteFurnitureAction }) => {
  const id = modalData ? modalData.id : "";
  const shouldRedirect = modalData ? modalData.shouldRedirect : false;
  const navigate = useNavigate();
  const deleteFurnitureHandler = () => {
    deleteFurnitureAction({ id, shouldRedirect, navigate });
  };
  return (
    <>
      <WarningModalsContent text="Are you sure you want to delete this furniture?" />
      <ModalButtons
        onSubmit={deleteFurnitureHandler}
        onClose={closeModal}
        submitButtonText="Delete"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  modalData: state.uiReducer.modalData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      closeModal,
      deleteFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);
