import { Tooltip } from "@material-ui/core";
import styles from "./Icons.module.css";
import classNames from "classnames";

const UserCheckedIcon = () => {
  const classes = classNames(
    "fas fa-user-check",
    `${styles["furniture-info-owned"]}`
  );
  return (
    <Tooltip title="Your furniture">
      <i className={classes}></i>
    </Tooltip>
  );
};

export default UserCheckedIcon;
