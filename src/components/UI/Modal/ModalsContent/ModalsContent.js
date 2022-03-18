import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';
import NotificationModal from "../NotificationModal/NotificationModal";
import Modal from "../Modal";
import ReviewModal from "../ReviewModal/ReviewModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LogoutModal from "../LogoutModal/LogoutModal";
import RemoveFromCartModal from "../RemoveFromCartModal/RemoveFromCartModal";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";

const ModalsContent = ({ modals, closeModal }) => {
  const { modalType, modal, loading, showNotification } = modals;
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    switch (modalType) {
      case "review":
        setModalContent(<ReviewModal />);
        break;
      case "delete":
        setModalContent(<DeleteModal />);
        break;
      case "logout":
        setModalContent(<LogoutModal />);
        break;
      case "remove-cart":
        setModalContent(<RemoveFromCartModal />);
        break;
      case "checkout":
        setModalContent(<CheckoutModal />);
        break;
      default:
        break;
    }
  }, [modalType]);

  return (
    <>
      {modal &&
        ReactDOM.createPortal(
          <Modal onClose={closeModal}>{modalContent}</Modal>,
          document.getElementById("backdrop-root")
        )}
      {loading &&
        ReactDOM.createPortal(
          <CircularProgress />,
          document.getElementById("spinner-root")
        )}
      {showNotification &&
        ReactDOM.createPortal(
          <NotificationModal />,
          document.getElementById("error-root")
        )}
    </>
  );
};

const mapStateToProps = (state) => ({
  modals: state.uiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ModalsContent);
