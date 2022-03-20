import { CATEGORIES } from "pages/All/All";

export const saveUserData = (token, email, username) => {
  localStorage.setItem("user_email", email);
  localStorage.setItem("username", username);
  localStorage.setItem("is_logged_in", "1");
  localStorage.setItem("user_token", token);
  localStorage.setItem("show_owned", true);
  localStorage.setItem("drawer_opened", true);
  localStorage.setItem("categories", JSON.stringify(CATEGORIES));
};

export const logoutUser = () => {
  localStorage.setItem("is_logged_in", "-1");
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("username");
  localStorage.removeItem("categories");
  localStorage.removeItem("show_owned");
  localStorage.removeItem("drawer_opened");
};
