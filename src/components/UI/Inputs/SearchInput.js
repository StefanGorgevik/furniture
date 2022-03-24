<<<<<<< Updated upstream
import React, { useEffect, useCallback, useState } from "react";
=======
import React, { useCallback, useEffect, useState } from "react";
>>>>>>> Stashed changes
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllFurnitureAction,
  searchForFurnitureAction,
} from "store/furniture/furnitureActions";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    color: "black",
    "&:hover": {
      background: "transparent",
    },
  },
  searchInput: {
    color: "black",
    backgroundColor: "whitesmoke",
    borderColor: "white",
    label: {
      background: "whitesmoke",
    },
    "&.Mui-input": {
      color: "black",
    },
  },
  inputLabel: {
    color: "black",
    opacity: "0.9",
    letterSpacing: "2px",
    "&.Mui-focused": {
      color: "black",
      background: "transparent",
    },
  },
}));
const SearchInput = ({ searchForFurnitureAction, getAllFurnitureAction }) => {
  const classes = useStyles();
  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState("");

  const submitSearch = () => {
    if (search.trim() !== "") {
      searchForFurnitureAction(search);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  const denySearchHandler = useCallback(() => {
    setSearched(false);
    getAllFurnitureAction();
  }, [getAllFurnitureAction]);

  const saveSearchHandler = (e) => {
    setSearched(true);
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim().length === 0 && searched) {
      denySearchHandler();
    }
  }, [search, denySearchHandler, searched]);

  return (
    <TextField
      style={{
        transition: "1s",
      }}
      className={classes.searchInput}
      variant="outlined"
      type="text"
      autoFocus={true}
      onChange={saveSearchHandler}
      label="Search "
      id="search-input"
      value={search}
      onKeyPress={handleKeyPress}
      InputLabelProps={{
        className: classes.inputLabel,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={submitSearch} className={classes.searchIcon}>
              <SearchIcon fontSize="large" />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          color: "black",
        },
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  showOwned: state.furnitureReducer.showOwned,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllFurnitureAction,
      searchForFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
