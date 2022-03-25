import { put } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
  closeModal,
  setLoadingStart,
  setLoadingStop,
  setActionStatus,
} from "store/ui/uiActions";
import {
  setIsUserLoggedInAction,
  loginStarted,
  // saveUserInfoAction,
  logoutUser as logoutUserAction,
} from "./authActions";
import { saveUserData, logoutUser } from "utils/localStorage";
// import { fetchRequest } from "utils/fetch";
import { authRequest, refreshTokenRequest } from "utils/fetch";
import { sendPwResetRequest } from "utils/fetch";

export function* isLoggedInSaga() {
  try {
    const isLogged = localStorage.getItem("is_logged_in") === "1";
    yield put(setIsUserLoggedInAction(isLogged));
  } catch (err) {
    console.log(err);
  }
}

export function* logoutUserSaga() {
  try {
    yield put(setLoadingStart());
    logoutUser();
    yield put(setIsUserLoggedInAction(false));
    yield put(closeModal());
    yield put(push("/"));
  } catch (e) {
    yield put(setActionStatus("error", "Unexpected error occurred!"));
  }
  yield put(setLoadingStop());
}

export function* loginUserSaga({ data }) {
  const path = "accounts:signInWithPassword";

  try {
    const res = yield authRequest(data, path);
    if (res.error) {
      let message = "Something went wrong!";
      const errorId = res.error.message;
      if (errorId === "EMAIL_NOT_FOUND") {
        message = "This email could not be found!";
      } else if (errorId === "INVALID_PASSWORD") {
        message = "This password is not valid!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "This email is not valid!";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        message = "Too many login attempts! Try again later!";
      }
      yield put(setActionStatus("error", message));
    } else {
      saveUserData(res.idToken, res.email, res.displayName, res.refreshToken);
      yield put(closeModal());
      yield put(setIsUserLoggedInAction(true));
      yield put(push("/furniture/all"));
      yield put(setActionStatus("success", "You have successfully logged in!"));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* registerUserSaga({ data }) {
  const path = `accounts:signUp`;

  try {
    const res = yield authRequest(data, path);
    const { email, password } = data;
    if (res.error) {
      let message = "Something went wrong!";
      const errorId = res.error.message;
      if (errorId === "EMAIL_EXISTS") {
        message = "This email exists already!";
      } else if (errorId === "INVALID_EMAIL") {
        message = "This email is not valid!";
      } else if (errorId.includes("WEAK_PASSWORD")) {
        message = "Password should be at least 6 characters!";
      }
      yield put(setActionStatus("error", message));
      return;
    } else {
      yield put(closeModal());
      yield put(loginStarted({ email, password }));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* refreshTokenSaga() {
  const refresh_token = localStorage.getItem("refresh_token");

  try {
    const res = yield refreshTokenRequest({
      grant_type: "refresh_token",
      refresh_token,
    });
    if (res) {
      if (res.error) {
        yield put(
          setActionStatus(
            "error",
            "Unexpected error occured! You have been logged out!"
          )
        );
        yield put(logoutUserAction());
        return;
      } else {
        localStorage.setItem("refresh_token", res.refresh_token);
        localStorage.setItem("user_token", res.id_token);
        const expiryTime = parseInt(res.expiresIn) * 1000;
        const expirationDate = new Date().getTime() + expiryTime;
        localStorage.setItem("expiresDate", JSON.stringify(expirationDate));
      }
    }
  } catch (e) {
    yield put(
      setActionStatus(
        "error",
        "Unexpected error occurred! You have been logged out!"
      )
    );
  }
}

export function* sendResetPwSaga({ data }) {
  const email = localStorage.getItem("user_email");

  try {
    const res = yield sendPwResetRequest({
      requestType: "PASSWORD_RESET",
      email: data.email ? data.email : email,
    });
    if (res) {
      if (res.error) {
        let message = "Unexpected error occurred!";
        if (res.error.message === "EMAIL_NOT_FOUND") {
          message = "Email not found!";
        } else if (res.error.message === "INVALID_EMAIL") {
          message = "This email is incorrect. Try again.";
        }
        yield put(setActionStatus("error", message));
        return;
      } else {
        yield put(
          setActionStatus(
            "success",
            "Reset link successfully sent to your email!"
          )
        );
        yield put(closeModal());
        yield put(logoutUserAction());
      }
    }
  } catch (e) {
    yield put(
      setActionStatus(
        "error",
        "Unexpected error occurred! You have been logged out!"
      )
    );
  }
}

// export function* changePasswordSaga({ data }) {
//   const path = "update";

//   try {
//     const res = yield authRequest(data, path);
//     if (res.error) {
//       let message = "Something went wrong!";
//       const errorId = res.error.message;
//       // if (errorId === "EMAIL_NOT_FOUND") {
//       //   message = "This email could not be found!";
//       // } else if (errorId === "INVALID_PASSWORD") {
//       //   message = "This password is not valid!";
//       // } else if (errorId === "INVALID_EMAIL") {
//       //   message = "This email is not valid!";
//       // } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
//       //   message = "Too many login attempts! Try again later!";
//       // }
//       // yield put(setActionStatus("error", message));
//     } else {
//       saveUserData(res.idToken, res.email, res.displayName);
//       yield put(closeModal());
//       yield put(setIsUserLoggedInAction(true));
//       yield put(push("/furniture/all"));
//       yield put(setActionStatus("success", "You have successfully logged in!"));
//     }
//   } catch (e) {
//     yield put(setActionStatus("error", e.message));
//   }
// }

// export function* getUserInfo({ email }) {
//   const path = `profile-info/${email}`;

//   try {
//     const res = yield fetchRequest(path, "GET");
//     if (res) {
//       yield put(saveUserInfoAction(res));
//     }
//   } catch (e) {
//     yield put(setActionStatus("error", e.message));
//   }
// }

// export function* saveEditedUserInfo({ data }) {
//   const path = `profile-info/edit/${data.email}`;

//   try {
//     const res = yield fetchRequest(path, "PUT", data);
//     yield put(setActionStatus("error", res.message));
//   } catch (e) {
//     yield put(setActionStatus("error", e.message));
//   }
// }

// export function* saveNewPassword({ data }) {
//   let { userData, email } = data;
//   const path = `profile-info/change-password/${email}`;

//   try {
//     const res = yield fetchRequest(path, "PUT", userData);
//     if (res.success) yield put(push("/profile"));
//     yield put(setActionStatus("error", res.message));
//   } catch (e) {
//     yield put(setActionStatus("error", e.message));
//   }
// }
