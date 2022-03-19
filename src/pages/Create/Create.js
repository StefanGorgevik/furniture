import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  saveNewFurnitureAction,
  editFurnitureAction,
  saveEditedFurnitureAction,
  openFurnitureAction,
} from "store/furniture/furnitureActions";
import { Input } from "components/UI/Inputs/Inputs";
import Dropdown from "components/UI/Select/Select";
import { useParams, useLocation } from "react-router-dom";
import { validateCreateForm } from "utils/validators";
import { Grid, Button, Typography } from "@material-ui/core";
import useStyles from "./styles";
import { useScreenSize } from "hooks/breakpoints";

const categories = [
  "Chair",
  "Table",
  "Desk",
  "Dresser",
  "Cupboard",
  "Bed",
  "Couch",
  "Uncategorized",
];

const Create = ({
  saveNewFurnitureAction,
  editingFurniture,
  furnitureToEdit,
  editFurnitureAction,
  saveEditedFurnitureAction,
  openFurnitureAction,
}) => {
  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const { pathname } = location;
  const { matchesMD } = useScreenSize();
  const furnitureID = params?.id;
  const [errors, setErrors] = useState({
    name: false,
    category: false,
    material: false,
    year: false,
    price: false,
    description: false,
    image: false,
  });

  const [userInput, setUserInput] = useState({
    name: "",
    category: "",
    year: "",
    description: "",
    price: "",
    image: "",
    material: "",
  });
  useEffect(() => {
    return () => {
      editFurnitureAction({
        furniture: {
          name: "",
          category: "",
          year: "",
          description: "",
          price: "",
          image: "",
          material: "",
        },
        editing: false,
      });
    };
  }, [editFurnitureAction]);

  useEffect(() => {
    if (editingFurniture && pathname.startsWith("/furniture/edit/")) {
      setUserInput(furnitureToEdit);
    }
    if (!editingFurniture && pathname.startsWith("/furniture/edit/")) {
      openFurnitureAction({ id: furnitureID, shouldRedirect: false });
    }
    if (pathname.startsWith("/furniture/create")) {
      setUserInput({
        name: "",
        category: "",
        year: "",
        description: "",
        price: "",
        image: "",
        material: "",
      });
    }
  }, [
    editingFurniture,
    furnitureToEdit,
    pathname,
    furnitureID,
    openFurnitureAction,
  ]);

  const saveValue = (e, id) => {
    setUserInput((prevState) => {
      return { ...prevState, [id]: e.target.value };
    });
  };

  const handleDropdownChangeHandler = (e) => {
    setUserInput((prevState) => {
      return { ...prevState, category: e.target.value };
    });
  };

  const submitFurnitureHandler = (e, onKey) => {
    if (e.key === "Enter" || !onKey) {
      e.preventDefault();
      setErrors({
        name: false,
        category: false,
        material: false,
        year: false,
        price: false,
        description: false,
        image: false,
      });
      const valData = validateCreateForm(userInput);
      setErrors(valData.allErrors);
      if (valData.errorCount > 0) return;
      if (pathname.startsWith("/furniture/edit")) {
        saveEditedFurnitureAction({ data: userInput, id: furnitureID });
      } else {
        saveNewFurnitureAction(userInput);
      }
    }
  };

  return (
    <Grid
      container
      className={classes.create}
      direction="column"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h3" style={{ textTransform: "uppercase" }}>
          {editingFurniture ? "Edit furniture" : "Add furniture"}
        </Typography>
      </Grid>
      <Grid
        item
        container
        direction="row"
        justifyContent="space-evenly"
        style={{
          padding: "1%",
          margin: "0 auto",
          width: "90%",
        }}
      >
        <Grid
          item
          container
          md={5}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item>
            <Input
              label="Name"
              type="text"
              id="name"
              value={userInput.name}
              onChange={(e) => saveValue(e, "name")}
            />
          </Grid>
          <Grid item>
            <Input
              label="Material"
              type="text"
              id="material"
              value={userInput.material}
              onChange={(e) => saveValue(e, "material")}
            />
          </Grid>
          <Grid item>
            <Input
              label="Image URL"
              type="text"
              id="image"
              value={userInput.image}
              onChange={(e) => saveValue(e, "image")}
              style={{ marginBottom: "10px" }}
            />
          </Grid>
          <Grid item style={{ marginBottom: matchesMD ? "15px" : "0" }}>
            <Dropdown
              options={categories}
              value={userInput.category}
              handleChange={handleDropdownChangeHandler}
            />
          </Grid>
        </Grid>
        <Grid item md={5} sm={12}>
          <Grid
            item
            container
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Grid item md={5} sm={12} style={{ width: "100%" }}>
              <Input
                label="Year"
                type="number"
                id="year"
                value={userInput.year}
                onChange={(e) => saveValue(e, "year")}
              />
            </Grid>
            <Grid item md={5} sm={12} style={{ width: "100%" }}>
              <Input
                label="Price (€)"
                type="number"
                id="price"
                value={userInput.price}
                onChange={(e) => saveValue(e, "price")}
              />
            </Grid>
          </Grid>
          <Input
            label="Description"
            type="text"
            id="description"
            value={userInput.description}
            onChange={(e) => saveValue(e, "description")}
            error={errors.description.length > 0}
            helperText={errors.description}
            rows={10}
          />
        </Grid>
      </Grid>

      <Grid item container justifyContent="center">
        <Button
          onClick={(e) => submitFurnitureHandler(e, false)}
          className={classes.createButton}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  furniture: state.furnitureReducer,
  editingFurniture: state.furnitureReducer.editingFurniture,
  furnitureToEdit: state.furnitureReducer.furnitureToEdit,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      saveNewFurnitureAction,
      editFurnitureAction,
      saveEditedFurnitureAction,
      openFurnitureAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Create);
