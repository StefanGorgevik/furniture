import styles from "./Icons.module.css";
import classNames from "classnames";

const SettingsIcon = () => {
  const classes = classNames("fas fa-cog", styles["settings-icon"]);
  return <i className={classes}></i>;
};

export default SettingsIcon;
