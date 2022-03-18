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
  let furnitureID = params?.id;
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
  // useEffect(() => {
  //   return () => {
  //     editFurnitureAction({
  //       furniture: {
  //         name: "",
  //         category: "",
  //         year: "",
  //         description: "",
  //         price: "",
  //         image: "",
  //         material: "",
  //       },
  //       editing: false,
  //     });
  //   };
  // }, [editFurnitureAction]);

  // useEffect(() => {
  //   if (editingFurniture && pathname.startsWith("/furniture/edit/")) {
  //     setUserInput(furnitureToEdit);
  //   }
  //   if (!editingFurniture && pathname.startsWith("/furniture/edit/")) {
  //     openFurnitureAction({ id: Number(furnitureID), shouldRedirect: false });
  //   }
  //   if (pathname.startsWith("/furniture/create")) {
  //     setUserInput({
  //       name: "",
  //       category: "",
  //       year: "",
  //       description: "",
  //       price: "",
  //       image: "",
  //       material: "",
  //     });
  //   }
  // }, [
  //   editingFurniture,
  //   furnitureToEdit,
  //   pathname,
  //   furnitureID,
  //   openFurnitureAction,
  // ]);

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
        justify="space-around"
        style={{
          padding: "1%",
          margin: "0 auto",
          marginBottom: "4em",
          width: "95%",
        }}
      >
        <Grid item container>
          <Input
            label="Name"
            type="text"
            id="name"
            value={userInput.name}
            onChange={(e) => saveValue(e, "name")}
            error={errors.name.length > 0}
          />
          <Dropdown
            options={categories}
            value={userInput.category}
            handleChange={handleDropdownChangeHandler}
            error={errors.category.length > 0}
          />
          <Input
            label="Material"
            type="text"
            id="material"
            value={userInput.material}
            onChange={(e) => saveValue(e, "material")}
            error={errors.material.length > 0}
          />
          <Input
            label="Image URL"
            type="text"
            id="image"
            value={userInput.image}
            onChange={(e) => saveValue(e, "image")}
            error={errors.image.length > 0}
          />
        </Grid>
        <Grid item>
          <Input
            label="Year"
            type="number"
            id="year"
            value={userInput.year}
            onChange={(e) => saveValue(e, "year")}
            error={errors.year.length > 0}
            helperText={errors.year}
          />

          <Input
            label="Price (€)"
            type="number"
            id="price"
            value={userInput.price}
            onChange={(e) => saveValue(e, "price")}
            error={errors.price}
            helperText={errors.price}
          />

          <Input
            label="Description"
            type="text"
            id="description"
            value={userInput.description}
            onChange={(e) => saveValue(e, "description")}
            error={errors.description.length > 0}
            helperText={errors.description}
            rows={8}
          />
        </Grid>
        <Grid item container justify="flex-end" style={{ width: "90%" }}>
          <Button
            onClick={(e) => submitFurnitureHandler(e, false)}
            className={classes.createButton}
          >
            Save
          </Button>
        </Grid>
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
