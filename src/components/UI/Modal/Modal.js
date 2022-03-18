import React, { useEffect, useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles, Dialog } from "@material-ui/core";

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

const Modal = ({ children, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    return () => {
      setShow(false);
    };
  }, []);

  return (
    <Dialog open={show} maxWidth="xl" onClose={onClose}>
      <CloseModal onClose={onClose} />
      {children}
    </Dialog>
  );
};

export default Modal;
