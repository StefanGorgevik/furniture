import React from "react";
import styles from "./Icons.module.css";

export const Spinner = () => {
  return (
    <div className={styles["spinner-wrap"]}>
      <div className={styles.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};