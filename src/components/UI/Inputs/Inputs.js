import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "40em",
    marginTop: "1em",
    paddingBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "1em",
      marginRight: "1em",
      width: "30em",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "1em",
      marginRight: "1em",
      width: "25em",
    },
  },
}));

export const Input = ({
  label,
  id,
  error,
  type,
  value,
  onChange,
  helperText,
  rows,
  width,
}) => {
  const classes = useStyles();

  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        id={id}
        error={error}
        helperText={helperText}
        type={type}
        onChange={onChange}
        value={value}
        className={classes.input}
        rows={rows ? rows : undefined}
        multiline={rows ? rows : undefined}
        style={{ width: width ? width : undefined }}
      />
      {!error && <p style={{ height: "30px" }}></p>}
    </>
  );
};
