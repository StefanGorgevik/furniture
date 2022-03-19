import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid } from "@material-ui/core";
import {
  searchForFurnitureAction,
  openFurnitureAction,
} from "store/furniture/furnitureActions";
import { FurnitureItem } from "components/Furniture/FurnitureItem/FurnitureItem";

const SearchedAll = ({
  searchedFurniture,
  openFurnitureAction,
  allFurnitureLoaded,
}) => {
  const openFurnitureHandler = (id) => {
    openFurnitureAction({
      id: Number(id),
      shouldRedirect: true,
    });
  };

  console.log("searchedFurniture", searchedFurniture);

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
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
            onClick={() => openFurnitureHandler(Number(item.id))}
            onDelete={false}
            onEdit={false}
          />
        );
      })}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  searchedFurniture: state.furnitureReducer.searchedFurniture,
  searchedFurnitureLoaded: state.furnitureReducer.searchedFurnitureLoaded,
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
