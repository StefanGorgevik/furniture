import React, { useEffect, useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles, Dialog } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";

const useStyles = makeStyles({
  closeWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "10px",
    paddingTop: "10px",
  },
});

const CloseModal = ({ onClose }) => {
  const classes = useStyles();

  return (
    <span className={classes.closeWrapper}>
      <span onClick={onClose}>
        <CancelIcon color="primary" style={{ cursor: "pointer" }} />
      </span>
    </span>
  );
};

const Modal = ({ children, onClose, modalType }) => {
  const [show, setShow] = useState(false);
  const { matchesSM } = useScreenSize();
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  return (
    <Dialog open={show} onClose={onClose} fullWidth={matchesSM} maxWidth="md">
      {modalType !== "relogin" && <CloseModal onClose={onClose} />}
      {children}
    </Dialog>
  );
};

export default Modal;
