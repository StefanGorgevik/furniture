import {
  ADD_TO_CART,
  GET_CART_DATA,
  SAVE_CART_DATA,
  REMOVE_FROM_CART,
  ORDER_SUCCESSFUL,
} from "./cartTypes";

export const addToCartAction = (data) => ({ type: ADD_TO_CART, data });
export const getCartDataAction = () => ({ type: GET_CART_DATA });
export const saveCartDataAction = (data) => ({ type: SAVE_CART_DATA, data });
export const removeFromCartAction = (id) => ({ type: REMOVE_FROM_CART, id });
export const orderSuccessfulAction = () => ({ type: ORDER_SUCCESSFUL });
