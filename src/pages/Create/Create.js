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
import { Grid, Typography } from "@material-ui/core";
import { useScreenSize } from "hooks/breakpoints";
import { Error } from "components/UI/formError";
import { useNavigate } from "react-router";
import { SubmitButton } from "components/UI/Buttons/Buttons";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  create: {
    padding: "1em",
    paddingTop: "1em",
    marginTop: "1em",
  },
}));
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
  const [error, setError] = useState("");
  const navigate = useNavigate();
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
      openFurnitureAction({
        id: furnitureID,
        shouldRedirect: false,
        navigate,
      });
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
    navigate,
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
      setError("");
      const valData = validateCreateForm(userInput);
      setError(valData);
      if (valData !== "") return;
      if (pathname.startsWith("/furniture/edit")) {
        saveEditedFurnitureAction({
          data: userInput,
          id: furnitureID,
          navigate,
        });
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
      justifyContent="center"
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
              error={error.includes("name")}
              setError={setError}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item>
            <Input
              label="Material"
              type="text"
              id="material"
              value={userInput.material}
              onChange={(e) => saveValue(e, "material")}
              error={error.includes("material")}
              setError={setError}
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
              error={error.includes("image")}
              setError={setError}
            />
          </Grid>
          <Grid item style={{ marginBottom: matchesMD ? "15px" : "0" }}>
            <Dropdown
              options={categories}
              value={userInput.category}
              handleChange={handleDropdownChangeHandler}
              error={error.includes("category")}
              setError={setError}
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
                error={error.includes("year")}
                setError={setError}
              />
            </Grid>
            <Grid item md={5} sm={12} style={{ width: "100%" }}>
              <Input
                label="Price (€)"
                type="number"
                id="price"
                value={userInput.price}
                onChange={(e) => saveValue(e, "price")}
                error={error.includes("price")}
                setError={setError}
              />
            </Grid>
          </Grid>
          <Input
            label="Description"
            type="text"
            id="description"
            value={userInput.description}
            onChange={(e) => saveValue(e, "description")}
            rows={10}
            error={error.includes("description")}
            setError={setError}
          />
        </Grid>
      </Grid>
      <Error error={error} />
      <Grid item container justifyContent="center">
        <SubmitButton onClick={(e) => submitFurnitureHandler(e, false)}>
          {" "}
          Save
        </SubmitButton>
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
