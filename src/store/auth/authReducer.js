import { SAVE_IS_LOGGED_IN, SAVE_USER_INFO } from "./authTypes";

const initState = {
  isLoggedIn: false,
  userInfo: { name: "", email: "" },
  isUserInfoLoaded: false,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SAVE_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.logged };
    case SAVE_USER_INFO:
      return { ...state, userInfo: action.data, isUserInfoLoaded: true };
    default:
      return state;
  }
};

export default authReducer;
