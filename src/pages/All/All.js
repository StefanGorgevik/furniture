import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllFurnitureAction,
  openFurnitureAction,
} from "store/furniture/furnitureActions";
import { getStatsAction } from "store/stats/statsActions";
import NoItemsFound from "components/Furniture/NoItemsFound/NoItemsFound";
import { Grid } from "@material-ui/core";
import { editFurnitureAction } from "store/furniture/furnitureActions";
import Category from "components/Category/Category";

const All = ({
  getAllFurnitureAction,
  allFurniture,
  openFurnitureAction,
  loading,
  getStatsAction,
  allFurnitureLoaded,
}) => {
  useEffect(() => {
    // getStatsAction();
    getAllFurnitureAction();
  }, [getAllFurnitureAction]);

  const openFurnitureHandler = (id) => {
    openFurnitureAction({
      id,
      shouldRedirect: true,
    });
  };

  let empty = false;
  Object.keys(allFurniture).map((key) => {
    for (let fur in allFurniture[key]) {
      if (fur.length > 0) {
        empty = true;
      }
    }
  });

  if (allFurnitureLoaded && !empty && !loading) {
    return (
      <NoItemsFound
        location="/furniture/create"
        text="No furniture found"
        subText="Please create some"
        buttonText="Create"
      />
    );
  }

  return (
    <Grid container direction="column" justifyContent="center">
      {empty && !loading && (
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
          {Object.keys(allFurniture).map((key, i) => {
            return (
              <Category
                itemKey={key}
                key={i}
                openFurnitureHandler={openFurnitureHandler}
                allFurniture={allFurniture}
              />
            );
          })}
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  loading: state.uiReducer.loading,
  allFurniture: state.furnitureReducer.allFurniture,
  allFurnitureNumber: state.statsReducer.stats.furniture,
  allFurnitureLoaded: state.furnitureReducer.allFurnitureLoaded,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllFurnitureAction,
      openFurnitureAction,
      getStatsAction,
      editFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(All);
