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
  saveUserInfoAction,
} from "./authActions";
import { saveUserData, logoutUser } from "utils/localStorage";
import { fetchRequest } from "utils/fetch";

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
  const path = `auth/login`;

  try {
    const res = yield fetchRequest(path, "POST", data);
    if (res.success) {
      saveUserData(res.token, data.email, res.user.username);
      yield put(closeModal());
      yield put(setIsUserLoggedInAction(true));
      yield put(push("/furniture/all"));
      yield put(setActionStatus("success", "You have successfully logged in!"));
    } else {
      yield put(setActionStatus("error", res.message));
    }
  } catch (e) {
    console.log(e);
    yield put(setActionStatus("error", e.message));
  }
}

export function* registerUserSaga({ data }) {
  const path = `auth/signup`;
  try {
    const res = yield fetchRequest(path, "POST", {
      username: data.username,
      email: data.email,
      password: data.password,
    });
    const { email, password } = data;
    if (res.errors?.email) {
      yield put(setActionStatus("error", res.errors.email));
      return;
    }
    if (res.success) {
      yield put(closeModal());
      yield put(loginStarted({ email, password }));
    } else {
      yield put(setActionStatus("error", res.message));
    }
  } catch (e) {
    console.log(e);
    yield put(setActionStatus("error", e.message));
  }
}

export function* getUserInfo({ email }) {
  const path = `profile-info/${email}`;

  try {
    const res = yield fetchRequest(path, "GET");
    if (res) {
      yield put(saveUserInfoAction(res));
    }
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* saveEditedUserInfo({ data }) {
  const path = `profile-info/edit/${data.email}`;

  try {
    const res = yield fetchRequest(path, "PUT", data);
    yield put(setActionStatus("error", res.message));
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}

export function* saveNewPassword({ data }) {
  let { userData, email } = data;
  const path = `profile-info/change-password/${email}`;

  try {
    const res = yield fetchRequest(path, "PUT", userData);
    if (res.success) yield put(push("/profile"));
    yield put(setActionStatus("error", res.message));
  } catch (e) {
    yield put(setActionStatus("error", e.message));
  }
}
