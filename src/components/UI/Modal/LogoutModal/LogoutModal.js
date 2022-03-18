import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ModalButtons from "../ModalButtons/ModalButtons";
import { logoutUser } from "store/auth/authActions";
import WarningModalsContent from "components/UI/Modal/WarningModalsContent/WarningModalsContent";

const LogoutModal = ({ closeModal, logoutUser }) => {
  const logout = () => {
    logoutUser();
  };
  return (
    <>
      <WarningModalsContent text="Are you sure you want to logout?" />
      <ModalButtons
        onSubmit={logout}
        onClose={closeModal}
        submitButtonText="Logout"
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
      logoutUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);
