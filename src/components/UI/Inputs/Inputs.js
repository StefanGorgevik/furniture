import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
    minWidth: "100%",
    marginTop: "1em",
    paddingBottom: "20px",
  },
}));

export const Input = ({
  label,
  id,
  error,
  type,
  value,
  onChange,
  rows,
  style,
  setError,
  inputProps,
}) => {
  const classes = useStyles();

  return (
    <TextField
      inputProps={inputProps ? inputProps : {}}
      style={{ ...style }}
      error={error}
      variant="outlined"
      label={label}
      id={id}
      type={type}
      onChange={(e) => {
        if (setError && error && e.target.value.length > 0) {
          setError("");
        }
        onChange(e);
      }}
      value={value}
      className={classes.input}
      rows={rows ? rows : undefined}
      multiline={rows ? true : false}
    />
  );
};
