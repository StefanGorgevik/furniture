import { takeLatest } from "redux-saga/effects";
import {
  LOGIN_STARTED,
  REGISTER_STARTED,
  IS_USER_LOGGED,
  LOGOUT_USER,
  // GET_USER_INFO,
  // SAVE_EDITED_INFO,
  // SAVE_NEW_PASSWORD,
  REFRESH_TOKEN_STARTED,
  SET_PW_RESET,
} from "./auth/authTypes";
import {
  GET_ALL_FURNITURE,
  SAVE_NEW_FURNITURE,
  OPEN_FURNITURE_ITEM,
  SEARCH_FURNITURE,
  SUBMIT_REVIEW,
  GET_ALL_REVIEWS,
  LIKE_FURNITURE,
  GET_MY_FURNITURE,
  DELETE_FURNITURE_ACCEPT,
  SAVE_EDITED_FURNITURE,
} from "./furniture/furnitureTypes";
import {
  loginUserSaga,
  registerUserSaga,
  isLoggedInSaga,
  logoutUserSaga,
  // getUserInfo,
  // saveEditedUserInfo,
  // saveNewPassword,
  refreshTokenSaga,
  sendResetPwSaga,
} from "./auth/authSagas";
import {
  getAllFurniture,
  saveNewFurniture,
  openFurnitureItem,
  searchFurniture,
  submitReview,
  getAllReviews,
  likeFurniture,
  getMyFurniture,
  deleteFurniture,
  editFurniture,
} from "./furniture/furnitureSagas";
import {
  ADD_TO_CART,
  GET_CART_DATA,
  REMOVE_FROM_CART,
  ORDER_SUCCESSFUL,
} from "./cart/cartTypes";
import {
  addToCart,
  getCartData,
  removeFromCart,
  emptyCart,
} from "./cart/cartSagas";

export default function* mainSaga() {
  yield takeLatest(LOGIN_STARTED, loginUserSaga);
  yield takeLatest(REGISTER_STARTED, registerUserSaga);
  yield takeLatest(REFRESH_TOKEN_STARTED, refreshTokenSaga);
  yield takeLatest(SET_PW_RESET, sendResetPwSaga);
  yield takeLatest(GET_ALL_FURNITURE, getAllFurniture);
  yield takeLatest(SAVE_NEW_FURNITURE, saveNewFurniture);
  yield takeLatest(IS_USER_LOGGED, isLoggedInSaga);
  yield takeLatest(LOGOUT_USER, logoutUserSaga);
  yield takeLatest(OPEN_FURNITURE_ITEM, openFurnitureItem);
  yield takeLatest(SEARCH_FURNITURE, searchFurniture);
  yield takeLatest(SUBMIT_REVIEW, submitReview);
  yield takeLatest(GET_ALL_REVIEWS, getAllReviews);
  yield takeLatest(LIKE_FURNITURE, likeFurniture);
  yield takeLatest(GET_MY_FURNITURE, getMyFurniture);
  yield takeLatest(DELETE_FURNITURE_ACCEPT, deleteFurniture);
  // yield takeLatest(GET_USER_INFO, getUserInfo);
  // yield takeLatest(SAVE_EDITED_INFO, saveEditedUserInfo);
  // yield takeLatest(SAVE_NEW_PASSWORD, saveNewPassword);
  yield takeLatest(SAVE_EDITED_FURNITURE, editFurniture);
  yield takeLatest(ADD_TO_CART, addToCart);
  yield takeLatest(GET_CART_DATA, getCartData);
  yield takeLatest(REMOVE_FROM_CART, removeFromCart);
  yield takeLatest(ORDER_SUCCESSFUL, emptyCart);
}
