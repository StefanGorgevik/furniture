import React from "react";
import styles from "./Buttons.module.css";
import { Tooltip } from "@material-ui/core";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className={styles["back-button"]}>
      <ArrowBackIcon />
    </button>
  );
};

export const HomePageButton = ({ onClick, text, active }) => {
  const classes = classNames(styles["home-page-btn"], styles[active]);
  return (
    <button className={classes} onClick={onClick}>
      {text}
    </button>
  );
};

const Button = ({ text, styling, click, icon }) => {
  let buttonType = "button";
  if (styling === "sign-in" || styling === "register") buttonType = "submit";
  return (
    <Tooltip title={styling === "logout-btn" ? "Logout" : ""}>
      <button
        type={buttonType}
        onClick={click}
        className={`${styles.btn} ${styles[styling]}`}
      >
        {text}
        {icon && icon}
      </button>
    </Tooltip>
  );
};

export default Button;
