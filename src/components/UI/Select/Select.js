import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(5),

    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dropdown = ({ options, value, handleChange, error, helperText }) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={handleChange}
        label="Category"
        align="left"
      >
        {options.map((option, i) => {
          return (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
