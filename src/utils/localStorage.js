export const saveUserData = (token, email, username) => {
  localStorage.setItem("user_email", email);
  localStorage.setItem("username", username);
  localStorage.setItem("is_logged_in", "1");
  localStorage.setItem("user_token", token);
};

export const logoutUser = () => {
  localStorage.setItem("is_logged_in", "-1");
  localStorage.removeItem("user_token");
  localStorage.removeItem("user_email");
  localStorage.removeItem("username");
};
