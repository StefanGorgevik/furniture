import {
  GET_ALL_FURNITURE,
  SAVE_ALL_FURNITURE,
  SAVE_NEW_FURNITURE,
  SAVE_CURRENT_FURNITURE,
  SAVE_ALL_REVIEWS,
  SAVE_MY_FURNITURE,
  FURNITURE_NOT_FOUND,
  SAVE_TOTAL_LIKES,
  EDIT_FURNITURE,
  SORT_MY_FURNITURE,
  OPEN_FURNITURE_ITEM,
  SEARCH_FURNITURE,
  SUBMIT_REVIEW,
  GET_ALL_REVIEWS,
  LIKE_FURNITURE,
  GET_MY_FURNITURE,
  DELETE_FURNITURE_ACCEPT,
  SAVE_EDITED_FURNITURE,
  SAVE_SEARCHED_FURNITURE,
} from "./furnitureTypes";

export const getAllFurnitureAction = (page) => ({
  type: GET_ALL_FURNITURE,
  page,
});
export const saveAllFurnitureAction = (data) => ({
  type: SAVE_ALL_FURNITURE,
  data,
});

export const saveNewFurnitureAction = (data) => ({
  type: SAVE_NEW_FURNITURE,
  data,
});
export const openFurnitureAction = (data) => ({
  type: OPEN_FURNITURE_ITEM,
  data,
});

export const saveCurrentFurnitureAction = (data) => ({
  type: SAVE_CURRENT_FURNITURE,
  data,
});

export const searchForFurnitureAction = (search) => ({
  type: SEARCH_FURNITURE,
  search,
});

export const submitReviewAction = (data, id, navigate) => ({
  type: SUBMIT_REVIEW,
  data,
  id,
  navigate,
});

export const getAllReviewsAction = (id) => ({
  type: GET_ALL_REVIEWS,
  id,
});

export const saveAllReviewsAction = (data) => ({
  type: SAVE_ALL_REVIEWS,
  data,
});

export const likeFurnitureAction = (data) => ({
  type: LIKE_FURNITURE,
  data,
});

export const getMyFurnitureAction = () => ({
  type: GET_MY_FURNITURE,
});

export const saveMyFurnitureAction = (data) => ({
  type: SAVE_MY_FURNITURE,
  data,
});

export const deleteFurnitureAction = (data) => ({
  type: DELETE_FURNITURE_ACCEPT,
  data,
});

export const searchNotFoundAction = () => ({ type: FURNITURE_NOT_FOUND });

export const saveTotalLikes = (data) => ({ type: SAVE_TOTAL_LIKES, data });

export const editFurnitureAction = (data) => ({ type: EDIT_FURNITURE, data });
export const saveEditedFurnitureAction = (data) => ({
  type: SAVE_EDITED_FURNITURE,
  data,
});

export const sortMyFurnitureAction = (data) => ({
  type: SORT_MY_FURNITURE,
  data,
});

export const saveSearchedFurnitureAction = (data) => ({
  type: SAVE_SEARCHED_FURNITURE,
  data,
});
