import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Typography } from "@material-ui/core";
import {
  searchForFurnitureAction,
  openFurnitureAction,
} from "store/furniture/furnitureActions";
import { FurnitureItem } from "components/Furniture/FurnitureItem/FurnitureItem";
import SearchInput from "components/UI/Inputs/SearchInput";
import { useScreenSize } from "hooks/breakpoints";

const SearchedAll = ({
  searchedFurniture,
  openFurnitureAction,
  searchedFurnitureLoaded,
  searchFurnitureNotFound,
}) => {
  const { matchesSM } = useScreenSize();
  const openFurnitureHandler = (id) => {
    openFurnitureAction({
      id,
      shouldRedirect: true,
    });
  };

  return (
    <Grid container justify="center">
      <Grid
        item
        container
        justify="center"
        style={{
          marginTop: matchesSM ? "2em" : "1em",
          marginBottom: matchesSM ? "1em" : 0,
        }}
      >
        <SearchInput />
      </Grid>
      {searchFurnitureNotFound && searchedFurnitureLoaded ? (
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1%",
            marginTop: 250,
            width: "95%",
            height: "100%",
          }}
        >
          <Grid item>
            <Typography variant="h5">No results found!</Typography>
          </Grid>
          <Grid item>
            <Typography variant="caption">Please try again.</Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid
          item
          container
          direction="row"
          justify="center"
          style={{
            padding: "1%",
            margin: "0 auto",
            marginBottom: "4em",
            width: "95%",
          }}
        >
          {searchedFurniture.map((item, j) => {
            return (
              <FurnitureItem
                key={j}
                showIcon={true}
                price={item.price}
                isMine={item.createdBy === localStorage.getItem("user_email")}
                item={item}
                showTools={false}
                onClick={() => openFurnitureHandler(item.id)}
                onDelete={false}
                onEdit={false}
              />
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  searchedFurniture: state.furnitureReducer.searchedFurniture,
  searchedFurnitureLoaded: state.furnitureReducer.searchedFurnitureLoaded,
  searchFurnitureNotFound: state.furnitureReducer.searchFurnitureNotFound,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      openFurnitureAction,
      searchForFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SearchedAll);
