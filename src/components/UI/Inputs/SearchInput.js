import React, { useEffect, useState } from "react";
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
    color: "white",
    "&:hover": {
      background: "transparent",
    },
  },
  searchInput: {
    color: "black",
    marginBottom: "17px",
    marginLeft: "17px",
    label: {
      background: "whitesmoke",
    },
  },
  inputLabel: {
    color: "#fff",
    opacity: "0.9",
    letterSpacing: "2px",
    "&.Mui-focused": {
      color: "orange",
    },
  },
}));
const SearchInput = ({ searchForFurnitureAction, getAllFurnitureAction }) => {
  const classes = useStyles();
  const [searched, setSearched] = useState(false);
  const [search, setSearch] = useState("");
  const [expended, setExpended] = useState(false);

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

  const denySearchHandler = () => {
    setSearched(false);
    getAllFurnitureAction();
  };

  const saveSearchHandler = (e) => {
    setSearched(true);
    setSearch(e.target.value);
  };

  const onBlurHandler = () => {
    setExpended(false);
    setSearch("");
    setSearched(false);
  };

  useEffect(() => {
    if (search.trim().length === 0 && searched) {
      denySearchHandler();
    }
  }, [search, denySearchHandler, searched]);

  return (
    <TextField
      onBlur={onBlurHandler}
      onClick={() => setExpended(true)}
      style={{
        width: expended ? "27em" : "3em",
        marginLeft: "1em",
        transition: "1s",
      }}
      className={classes.searchInput}
      type="text"
      onChange={saveSearchHandler}
      label={expended ? "Search" : ""}
      id="search-input"
      value={search}
      onKeyPress={handleKeyPress}
      InputLabelProps={{
        className: classes.inputLabel,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment>
            <IconButton onClick={submitSearch} className={classes.searchIcon}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
        style: {
          color: "white",
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
