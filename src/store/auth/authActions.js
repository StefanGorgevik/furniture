import {
  LOGIN_STARTED,
  REGISTER_STARTED,
  IS_USER_LOGGED,
  SAVE_IS_LOGGED_IN,
  GET_USER_INFO,
  SAVE_USER_INFO,
  SAVE_EDITED_INFO,
  SAVE_NEW_PASSWORD,
  LOGOUT_USER,
  REFRESH_TOKEN_STARTED,
} from "./authTypes";

export const loginStarted = (data) => ({ type: LOGIN_STARTED, data });
export const registerStarted = (data) => ({ type: REGISTER_STARTED, data });

export const isUserLoggedInAction = () => ({ type: IS_USER_LOGGED });
export const logoutUser = () => {
  return { type: LOGOUT_USER };
};
export const setIsUserLoggedInAction = (bool) => ({
  type: SAVE_IS_LOGGED_IN,
  logged: bool,
});

export const getUserInfoAction = (email) => ({
  type: GET_USER_INFO,
  email,
});

export const saveUserInfoAction = (data) => ({
  type: SAVE_USER_INFO,
  data,
});

export const saveEditedInfoAction = (data) => ({
  type: SAVE_EDITED_INFO,
  data,
});

export const saveNewPasswordAction = (data) => ({
  type: SAVE_NEW_PASSWORD,
  data,
});

export const refreshTokenAction = () => ({
  type: REFRESH_TOKEN_STARTED,
});
