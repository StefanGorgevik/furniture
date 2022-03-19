import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { TextFields } from "@material-ui/icons";

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
}) => {
  const classes = useStyles();

  return (
    <TextField
      style={{ ...style }}
      variant="outlined"
      label={label}
      id={id}
      type={type}
      onChange={onChange}
      value={value}
      className={classes.input}
      rows={rows ? rows : undefined}
      multiline={rows ? true : false}
    />
  );
};
