import React from "react";
import {
  Grid,
  makeStyles,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    paddingTop: "1em",
    width: "60em",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1em",
    },
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
}));

const MyFurnitureFilter = ({ setOrder, setFilter, filter, order }) => {
  const filters = ["date", "price", "likes", "name", "reviews"];
  const classes = useStyles();
  const handleChange = (event) => {
    setOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Grid
      item
      container
      alignItems="center"
      justifyContent="space-evenly"
      spacing={8}
      className={classes.filterContainer}
    >
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="order-label">Order</InputLabel>
        <Select
          labelId="order-label"
          id="order"
          value={order}
          style={{
            textTransform: "capitalize",
          }}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="des">Descending</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="sort-label">Sort</InputLabel>

        <Select
          labelId="order-label"
          id="order"
          value={filter}
          onChange={handleFilterChange}
          label="Sort"
          style={{ textTransform: "capitalize", paddingLeft: "0.5em" }}
        >
          {filters.map((f, i) => (
            <MenuItem key={i} value={f} style={{ textTransform: "capitalize" }}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default MyFurnitureFilter;
