import { SAVE_CART_DATA, ORDER_SUCCESSFUL } from "./cartTypes";

const initState = {
  cartItems: [],
  cartItemsLoaded: false,
  totalPrice: 0,
};

const cartReducer = (state = initState, { type, data }) => {
  switch (type) {
    case SAVE_CART_DATA:
      return {
        ...state,
        cartItems: data.items,
        totalPrice: data.totalPrice,
        cartItemsLoaded: true,
      };
    case ORDER_SUCCESSFUL:
      return {
        ...state,
        cartItem: [],
        totalPrice: 0,
        cartItemsLoaded: false,
      };
    default:
      return state;
  }
};

export default cartReducer;
