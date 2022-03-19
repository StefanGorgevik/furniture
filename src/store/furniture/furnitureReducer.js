import {
  SAVE_ALL_FURNITURE,
  SAVE_CURRENT_FURNITURE,
  SAVE_ALL_REVIEWS,
  SAVE_MY_FURNITURE,
  FURNITURE_NOT_FOUND,
  SAVE_TOTAL_LIKES,
  EDIT_FURNITURE,
  SORT_MY_FURNITURE,
  SAVE_SEARCHED_FURNITURE,
} from "./furnitureTypes";
import sort, { sortByDate } from "utils/sort";

const initState = {
  allFurniture: {},
  currentFurniture: {
    id: "",
    name: "",
    category: "",
    year: 0,
    price: 0,
    createdOn: "",
    likes: "",
    reviews: 0,
    image: "",
    likes: [],
  },
  currentFurnitureReviews: [],
  allFurnitureLoaded: false,
  currentFurnitureLoaded: false,
  myFurnitureLoaded: false,
  myFurniture: [],
  searchFurnitureNotFound: false,
  totalLikes: 0,
  furnitureToEdit: {
    name: "",
    category: "",
    year: "",
    description: "",
    price: "",
    image: "",
    material: "",
  },
  editingFurniture: false,
  showOwned: true,
  searchedFurniture: [],
  searchedFurnitureLoaded: false,
};

const statsReducer = (state = initState, { type, data }) => {
  switch (type) {
    case SAVE_ALL_FURNITURE:
      return {
        ...state,
        allFurniture: data,
        allFurnitureLoaded: true,
        searchFurnitureNotFound: false,
        showOwned: true,
      };
    case SAVE_CURRENT_FURNITURE: {
      return { ...state, currentFurniture: data, currentFurnitureLoaded: true };
    }
    case SAVE_ALL_REVIEWS: {
      return { ...state, currentFurnitureReviews: data };
    }
    case SAVE_MY_FURNITURE: {
      return {
        ...state,
        myFurniture: sortByDate(data, "des"),
        myFurnitureLoaded: true,
      };
    }
    case FURNITURE_NOT_FOUND: {
      return { ...state, allFurniture: [], searchFurnitureNotFound: true };
    }
    case SAVE_TOTAL_LIKES: {
      return { ...state, totalLikes: data };
    }
    case EDIT_FURNITURE: {
      return {
        ...state,
        furnitureToEdit: data.furniture,
        editingFurniture: data.editing,
      };
    }
    case SORT_MY_FURNITURE: {
      return {
        ...state,
        myFurniture: sort(state.myFurniture, data),
      };
    }
    case SAVE_SEARCHED_FURNITURE: {
      return {
        ...state,
        searchedFurniture: data,
        searchedFurnitureLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default statsReducer;
