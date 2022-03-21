import React, { useEffect, useMemo, useState, useRef } from "react";
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
import { SelectCategories } from "components/Category/SelectCategories";
import { FurnitureItem } from "components/Furniture/FurnitureItem/FurnitureItem";
import { useScreenSize } from "hooks/breakpoints";

export const CATEGORIES = [
  { id: 0, category: "All", value: true },
  { id: 1, category: "Chairs", value: false },
  { id: 2, category: "Tables", value: false },
  { id: 3, category: "Desks", value: false },
  { id: 4, category: "Dressers", value: false },
  { id: 5, category: "Cupboards", value: false },
  { id: 6, category: "Beds", value: false },
  { id: 7, category: "Couches", value: false },
  { id: 8, category: "Uncategorized", value: false },
];

const All = ({
  getAllFurnitureAction,
  allFurniture,
  openFurnitureAction,
  loading,
  getStatsAction,
  allFurnitureLoaded,
}) => {
  const user_email = localStorage.getItem("user_email");
  const [categories, setCategories] = useState(CATEGORIES);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [showOwned, setShowOwned] = useState(true);
  const { matchesSM } = useScreenSize();
  const wrapperRef = useRef(null);
  console.log("allFurniture", allFurniture);

  const changeDrawerOptions = (drawerOpened) => {
    setDrawerOpened(drawerOpened);
    localStorage.setItem("drawer_opened", drawerOpened);
  };

  const openFurnitureHandler = (id) => {
    openFurnitureAction({
      id,
      shouldRedirect: true,
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        changeDrawerOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  useEffect(() => {
    // getStatsAction();
    getAllFurnitureAction();
  }, [getAllFurnitureAction]);

  useEffect(() => {
    const drawer_opened = localStorage.getItem("drawer_opened");
    if (JSON.parse(drawer_opened)) {
      setDrawerOpened(drawer_opened);
    }
  }, []);

  useEffect(() => {
    const categories = localStorage.getItem("categories");
    if (categories) {
      setCategories(JSON.parse(categories));
    }
  }, []);

  useEffect(() => {
    const show_owned = localStorage.getItem("show_owned");
    console.log("USE EFFECT", JSON.parse(show_owned));
    if (show_owned) {
      setShowOwned(JSON.parse(show_owned));
    }
  }, []);

  const allProducts = useMemo(() => {
    let array = [];
    if (Object.keys(allFurniture).length === 0) return array;
    categories.forEach((cat) => {
      if (cat.category === "All" && cat.value) {
      }
      if (cat.value) {
        if (cat.category === "All") {
          Object.keys(allFurniture).forEach((key) => {
            allFurniture[key].forEach((furniture) => {
              array.push(furniture);
            });
          });
        } else {
          allFurniture[cat.category.toLowerCase()].forEach((item) =>
            array.push(item)
          );
        }
      }
    });
    if (!showOwned) {
      array = array.filter((item) => item.user === user_email);
    }
    if (array.length === 0) {
      changeDrawerOptions(true);
    }
    return array ? array : [];
  }, [categories, allFurniture, showOwned, user_email]);

  return (
    <Grid container direction="row" justifyContent="center">
      {allProducts.length === 0 && !loading && allFurnitureLoaded ? (
        <NoItemsFound
          location="/furniture/create"
          text="No furniture found"
          subText="Please select from the filters or create some!"
          buttonText="Create"
        />
      ) : (
        <Grid
          md={12}
          style={{ width: "100%", paddingTop: "1em" }}
          item
          container
          // justifyContent={matchesSM && !drawerOpened ? "center" : "flex-start"}
          justifyContent="center"
        >
          {allProducts.map((item) => {
            return (
              <FurnitureItem
                key={item.id}
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
      <Grid item ref={wrapperRef}>
        <SelectCategories
          categories={categories}
          setCategories={setCategories}
          opened={drawerOpened}
          setOpened={changeDrawerOptions}
          showOwned={showOwned}
          setShowOwned={setShowOwned}
        />
      </Grid>
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
