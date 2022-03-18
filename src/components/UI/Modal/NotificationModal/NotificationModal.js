import React, { useEffect, useState } from "react";
import styles from "./NotificationModal.module.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { closeNotificationModal } from "store/ui/uiActions";
import WarningIcon from '@material-ui/icons/Warning';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import CloseIcon from "@material-ui/icons/Close";
import CSSTransition from "react-transition-group/CSSTransition";

const CloseNotification = ({ closeModal }) => {
  return (
    <span className={styles["message-modal-close"]}>
      <span onClick={closeModal}>
        <CloseIcon />
      </span>
    </span>
  );
};

const NotificationModal = ({ modal, closeNotificationModal }) => {
  const { message, messageType } = modal;
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      closeNotificationModal();
    }, 3000);
  }, [closeNotificationModal]);

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={show}
      timeout={500}
      classNames="my-node"
    >
      <div className={styles["notification-modal"]}>
        {messageType === "success" ? <DoneAllIcon /> : <WarningIcon />}
        <p>{message}</p>
        <CloseNotification closeModal={closeNotificationModal} />
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  modal: state.uiReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ closeNotificationModal }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);
