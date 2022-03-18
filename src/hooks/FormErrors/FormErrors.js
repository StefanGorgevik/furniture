import React, { useEffect, useState } from "react";
import styles from "./FormErrors.module.css";

const FormErrors = ({ errors, isError, type }) => {
  const [errorContent, setErrorsContent] = useState(null);
  useEffect(() => {
    const errorKeys = Object.keys(errors);

    let allErrors = [];
    for (let err of errorKeys) {
      if (errors[err] && type === "auth") {
        switch (err) {
          case "username":
            allErrors.push(<li key={err}>Enter a valid username!</li>);
            break;

          case "email":
            allErrors.push(<li key={err}>Enter a valid email!</li>);
            break;
          case "repeatPassword":
            allErrors.push(<li key={err}>Passwords don't match!</li>);
            break;
          case "password":
            allErrors.push(<li key={err}>Enter a password!</li>);
            break;
          default:
            break;
        }
      }
    }
    setErrorsContent(allErrors);
  }, [errors, type]);

  return (
    <div className={styles["errors-div"]}>
      <h4>Check the form for errors!</h4>
      {isError && <ul>{errorContent}</ul>}
    </div>
  );
};

export default FormErrors;
