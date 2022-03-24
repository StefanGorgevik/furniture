import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import ModalItem from "../Modal";
import ReviewModal from "../ReviewModal/ReviewModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import LogoutModal from "../LogoutModal/LogoutModal";
import RemoveFromCartModal from "../RemoveFromCartModal/RemoveFromCartModal";
import CheckoutModal from "../CheckoutModal/CheckoutModal";
import { bindActionCreators } from "redux";
import { closeModal } from "store/ui/uiActions";
import ReloginModal from "../ReloginModal/ReloginModal";

const ModalsContent = ({ modals, closeModal }) => {
  const { modalType, modal } = modals;
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
      case "relogin":
        setModalContent(<ReloginModal />);
        break;
      default:
        break;
    }
  }, [modalType]);

  return (
    <>
      {modal &&
        ReactDOM.createPortal(
          <ModalItem
            onClose={() => (modalType === "relogin" ? null : closeModal())}
            modalType={modalType}
          >
            {modalContent}
          </ModalItem>,
          document.getElementById("backdrop-root")
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
