import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import {
  getMyFurnitureAction,
  openFurnitureAction,
  editFurnitureAction,
  sortMyFurnitureAction,
} from "store/furniture/furnitureActions";
import { openModal } from "store/ui/uiActions";
import { FurnitureItem } from "components/Furniture/FurnitureItem/FurnitureItem";
import NoItemsFound from "components/Furniture/NoItemsFound/NoItemsFound";
import MyFurnitureFilter from "components/MyFurnitureFilter/MyFurnitureFilter";
import { Grid } from "@material-ui/core";

const MyFurniture = ({
  getMyFurnitureAction,
  myFurniture,
  loading,
  openFurnitureAction,
  openModal,
  myFurnitureLoaded,
  editFurnitureAction,
  sortMyFurnitureAction,
}) => {
  const history = useHistory();

  const [filter, setFilter] = useState("date");
  const [order, setOrder] = useState("des");

  useEffect(() => {
    getMyFurnitureAction();
  }, [getMyFurnitureAction]);

  const deleteFurnitureHandler = (id) => {
    openModal("delete", { id: id, shouldRedirect: false });
  };

  const setFilterHandler = (filter) => {
    sortMyFurnitureAction({ filter, order });
    setFilter(filter);
  };

  const setOrderHandler = (order) => {
    sortMyFurnitureAction({ filter, order });
    setOrder(order);
  };

  const editFurnitureHandler = (furniture) => {
    const furnitureToEdit = {
      name: furniture.name,
      category: furniture.category,
      year: furniture.year,
      description: furniture.description,
      price: furniture.price,
      image: furniture.image,
      material: furniture.material,
    };
    editFurnitureAction({ furniture: furnitureToEdit, editing: true });
    history.push(`/furniture/edit/${furniture.id}`);
  };

  if (myFurnitureLoaded && myFurniture.length === 0 && !loading) {
    return (
      <NoItemsFound
        location="/furniture/create"
        text="No furniture found"
        subText="Please create some"
        buttonText="Create"
      />
    );
  } else {
    return (
      <Grid container style={{ marginBottom: "4em" }}>
        {myFurnitureLoaded && myFurniture.length > 0 && (
          <MyFurnitureFilter
            setFilter={setFilterHandler}
            setOrder={setOrderHandler}
            filter={filter}
            order={order}
          />
        )}
        <Grid item container justifyContent="center">
          {myFurniture.map((furniture) => {
            return (
              <FurnitureItem
                key={furniture.id}
                item={furniture}
                showIcon={false}
                price={furniture.price}
                isMine={
                  furniture.createdBy === localStorage.getItem("user_email")
                }
                showTools={true}
                onClick={() =>
                  openFurnitureAction({
                    id: furniture.id,
                    shouldRedirect: true,
                  })
                }
                onEdit={() => editFurnitureHandler(furniture)}
                onDelete={() => deleteFurnitureHandler(furniture.id)}
              />
            );
          })}
        </Grid>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    myFurniture: state.furnitureReducer.myFurniture,
    loading: state.uiReducer.loading,
    myFurnitureLoaded: state.furnitureReducer.myFurnitureLoaded,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getMyFurnitureAction,
      openFurnitureAction,
      openModal,
      editFurnitureAction,
      sortMyFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyFurniture);
